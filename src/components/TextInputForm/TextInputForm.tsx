import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

type TextInputFormProps = {
	onSubmit?: (text: string) => void;
};

function TextInputForm({ onSubmit }: TextInputFormProps) {
	const [value, setValue] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value || '';
		setValue(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(value);
	};

	return (
		<form className="flex" onSubmit={handleSubmit}>
			<div className="flex-1 mr-2">
				<TextInput
					onChange={handleChange}
					label="Enter a word or phrase"
					type="password"
					value={value}
				/>
			</div>
			<div className="flex-initial">
				<Button text="OK" type="submit" />
			</div>
		</form>
	);
}

export default TextInputForm;
