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
		<div className="App container mx-auto">
			<h1 className="text-5xl">Spider</h1>
			<div className="my-8">
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
