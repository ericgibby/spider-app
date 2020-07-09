import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import PlayContainer from './containers/PlayContainer';
import StartContainer from './containers/StartContainer';

function App() {
	const history = useHistory();

	const [text, setText] = useState('');

	const handleSubmit = (value: string) => {
		setText(value.toUpperCase());
		history.push('/play');
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
						<PlayContainer text={text} />
					</Route>
					<Redirect path="*" to="/start" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
