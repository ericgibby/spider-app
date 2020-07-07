import React, { ChangeEvent, SyntheticEvent } from 'react';

type TextInputProps = {
	label?: string;
	toggleText?: string;
	type?: 'number' | 'password' | 'text';
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onToggle?: (e: SyntheticEvent) => void;
};

function TextInput({
	label,
	onChange,
	onToggle,
	toggleText,
	type = 'text',
	value
}: TextInputProps) {
	return (
		<label className="TextInput flex items-center px-4 py-2 border border-gray-500 rounded-md">
			{label && <span className="sr-only">{label}</span>}
			<input
				className="flex-1"
				onChange={onChange}
				placeholder={label}
				type={type}
				value={value}
			/>
			{toggleText && (
				<button
					className="flex-initial ml-2 text-blue-400 hover:text-blue-500 uppercase text-sm"
					onClick={onToggle}
					type="button"
				>
					{toggleText}
				</button>
			)}
		</label>
	);
}

export default TextInput;
