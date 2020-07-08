import React from 'react';
import TextInputForm, {
	TextInputFormProps
} from '../components/TextInputForm/TextInputForm';

function StartContainer(props: TextInputFormProps) {
	return (
		<>
			<p className="mb-2">
				Enter a word or phrase for other players to guess.
			</p>
			<TextInputForm {...props} />
		</>
	);
}

export default StartContainer;
