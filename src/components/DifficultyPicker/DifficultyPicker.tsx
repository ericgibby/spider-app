import React, { ChangeEvent } from 'react';

type DifficultyPickerProps = {
	options?: { text: string; value: number }[];
	value?: number;
	onChange?: (value: number) => void;
};

function DifficultyPicker({ onChange, options, value }: DifficultyPickerProps) {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const val = parseInt(e.target.value, 10);
		onChange?.(val);
	};

	return (
		<label className="DifficultyPicker flex items-center">
			<span className="hidden md:inline mr-2">Difficulty:</span>
			<select
				className="px-4 py-2 border border-gray-500 rounded-md"
				onChange={handleChange}
				value={value}
			>
				{options &&
					options.map(({ text, value }) => (
						<option key={value} value={value}>
							{text}
						</option>
					))}
			</select>
		</label>
	);
}

export default DifficultyPicker;
