import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PlayContainer from './containers/PlayContainer';
import StartContainer from './containers/StartContainer';

function App() {
	return (
		<div className="App">
			<header className="py-6 bg-blue-600 text-white">
				<h1 className="container px-2 mx-auto text-5xl">Spider</h1>
			</header>
			<div className="container px-2 my-8 mx-auto">
				<Switch>
					<Route path="/start" component={StartContainer} />
					<Route path="/play" component={PlayContainer} />
					<Redirect path="*" to="/start" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
