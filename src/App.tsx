import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PlayContainer from './containers/PlayContainer';
import StartContainer from './containers/StartContainer';

function App() {
	return (
		<div className="App container mx-auto">
			<h1 className="text-5xl">Spider</h1>
			<div className="my-8">
				<Switch>
					<Route path="/start">
						<StartContainer
							onSubmit={(value: string) => {
								alert(value);
							}}
						/>
					</Route>
					<Route path="/play" component={PlayContainer} />
					<Redirect path="*" to="/start" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
