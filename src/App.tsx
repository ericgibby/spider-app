import React from 'react';
import Button from './components/Button/Button';
import TextInput from './components/TextInput/TextInput';

function App() {
	return (
		<div className="App container mx-auto">
			<h1 className="text-5xl">Spider</h1>
			<div className="my-8">
				<TextInput label="Enter a word or phrase" />
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
