import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TextInputForm from './components/TextInputForm/TextInputForm';

function App() {
	return (
		<div className="App container mx-auto">
			<h1 className="text-5xl">Spider</h1>
			<div className="my-8">
				<Switch>
					<Route path="/start">
						<TextInputForm
							onSubmit={(value: string) => {
								alert(value);
							}}
						/>
					</Route>
					<Redirect path="*" to="/start" />
				</Switch>
			</div>
		</div>
	);
}

export default App;
