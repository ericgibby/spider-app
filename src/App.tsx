import React from 'react';
import Button from './components/Button/Button';

function App() {
	return (
		<div className="App container mx-auto">
			<h1 className="text-5xl">Spider</h1>
			<div className="my-8">
				<Button
					onClick={() => {
						alert('Hello world!');
					}}
					text="OK"
				></Button>
			</div>
		</div>
	);
}

export default App;
