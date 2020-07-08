import React, { useMemo } from 'react';

type MaskedTextProps = {
	text?: string;
	usedLetters?: string[];
};

function MaskedText({ text, usedLetters }: MaskedTextProps) {
	const words = useMemo(() => getCharacters(text, usedLetters).split(' '), [
		text,
		usedLetters
	]);
	const parts = words
		.map((part, index) => {
			const letters = part.split('').map((letter, i) => (
				<span
					key={`Letter-${i}`}
					className="inline-block my-0 ml-0 mr-2"
				>
					{letter}
				</span>
			));
			return (
				<span key={`Word-${index}`} className="whitespace-no-wrap">
					{letters}
				</span>
			);
		})
		.reduce(
			(arr, part, index) => [
				...arr,
				part,
				<span key={`Space-${index}`}>&nbsp;</span>
			],
			[] as JSX.Element[]
		)
		.slice(0, -1); // Remove trailing space

	return parts.length ? (
		<div className="MaskedText text-4xl md:text-6xl">{parts}</div>
	) : null;
}

export default MaskedText;

export function getCharacters(word: string = '', letters: string[] = []) {
	// Convert array to map for faster lookup
	const usedLetters = letters.reduce(
		(obj, letter) => ({ ...obj, [letter]: true }),
		{} as { [key: string]: boolean }
	);
	const characters = word
		.toUpperCase()
		.split('')
		.map(letter => {
			// Only mask letters between 65-90 (A-Z)
			const code = letter.charCodeAt(0);
			if (code >= 65 && code <= 90) {
				return usedLetters[letter] ? letter : '_';
			}
			return letter;
		});
	return characters.join('');
}
