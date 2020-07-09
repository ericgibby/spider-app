import React, { SyntheticEvent, useMemo } from 'react';

// Generate array with all letters of the alphabet
const ALPHABET = new Array(26)
	.fill('')
	.map((_, index) => String.fromCharCode(65 + index));

type LetterButtonsProps = {
	text?: string;
	usedLetters?: string[];
	onClick?: (letter: string) => void;
};

function LetterButtons({ onClick, text, usedLetters }: LetterButtonsProps) {
	const handleClick = (e: SyntheticEvent) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const character = (e.target as any).value;
		onClick?.(character);
	};

	// Create map objects of letters in `text` and `usedLetters`
	const letters = useMemo(
		() => getLettersMap((text || '').toUpperCase().split('')),
		[text]
	);
	const selectedLetters = useMemo(() => getLettersMap(usedLetters), [
		usedLetters
	]);

	const buttons = ALPHABET.map(letter => (
		<button
			key={letter}
			className={`h-12 w-12 m-1 rounded-md focus:outline-none text-white border${
				selectedLetters[letter] && !letters[letter]
					? ' bg-red-600 border-red-700 hover:bg-red-700 hover:border-red-800'
					: ' bg-blue-600 border-blue-700 hover:bg-blue-700 hover:border-blue-800'
			}${
				selectedLetters[letter] ? ' opacity-25 cursor-not-allowed' : ''
			}`}
			value={letter}
			onClick={handleClick}
			disabled={!!selectedLetters[letter]}
		>
			{letter}
		</button>
	));

	return <div className="LetterButtons">{buttons}</div>;
}

export default LetterButtons;

function getLettersMap(letters: string[] = []) {
	return letters.reduce(
		(obj, letter) => ({ ...obj, [letter]: true }),
		{} as { [key: string]: boolean }
	);
}
