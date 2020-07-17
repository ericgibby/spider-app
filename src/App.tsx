import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import PlayContainer from './containers/PlayContainer';
import StartContainer from './containers/StartContainer';
import { lookupWord } from './services/dictionaryApi';

function App() {
	const history = useHistory();

	const [invalid, setInvalid] = useState(false);
	const [text, setText] = useState('');

	const handleSubmit = async (value: string) => {
		try {
			// Get list of unique words
			const words = Object.keys(
				// Split on white space to get individual words
				value.split(/\s/).reduce((obj, word) => {
					// Remove non-alpha characters at beginning or end of word
					const key = word
						.replace(/^[^\w]+|[^\w]+$/, '')
						.toLowerCase();
					return { ...obj, [key]: true };
				}, {} as { [key: string]: boolean })
			);
			// Make individual requests in parallel
			const lookups = words.map(word => {
				return lookupWord(word);
			});
			// Wait for all requests, then check validity of each word
			const responses = await Promise.all(lookups);
			const invalid = !responses.reduce((valid, results, index) => {
				return (
					valid &&
					results.some(({ meta }) => {
						return meta?.stems.includes(words[index]) || false;
					})
				);
			}, true);
			setInvalid(invalid);
		} catch (err) {
			// Don't want to prevent play if there is an API error, and don't
			// want to potentially show a false warning.
			console.error(err);
			setInvalid(false);
		} finally {
			setText(value.toUpperCase());
			history.push('/play');
		}
	};

	return (
		<div className="App">
			<header className="py-6 bg-blue-600 text-white">
				<h1 className="container px-2 mx-auto text-5xl">Spider</h1>
			</header>
			<div className="container px-2 my-8 mx-auto">
				<Switch>
					<Route path="/start">
						<StartContainer onSubmit={handleSubmit} />
					</Route>
					<Route path="/play">
						<PlayContainer invalid={invalid} text={text} />
					</Route>
					<Redirect path="*" to="/start" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
