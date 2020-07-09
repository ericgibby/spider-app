import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LetterButtons from '../components/LetterButtons/LetterButtons';
import MaskedText from '../components/MaskedText/MaskedText';
import Spider from '../components/Spider/Spider';

type PlayContainerProps = {
	text?: string;
};

function PlayContainer({ text }: PlayContainerProps) {
	const [usedLetters, setUsedLetters] = useState<string[]>([]);

	const textLetters = useMemo(
		() =>
			(text || '')
				.split('')
				.reduce(
					(obj, letter) => ({ ...obj, [letter]: true }),
					{} as { [letter: string]: boolean }
				),
		[text]
	);

	const incorrectCount = useMemo(
		() =>
			usedLetters.reduce((count, letter) => {
				return !textLetters[letter] ? count + 1 : count;
			}, 0),
		[textLetters, usedLetters]
	);

	const handleClick = (letter: string) => {
		setUsedLetters(previous => [...previous, letter]);
	};

	return (
		<>
			<Link
				className="text-blue-600 underline hover:text-blue-700"
				to="/start"
			>
				Start Over
			</Link>
			<div className="my-6 py-4 border-b border-gray-500">
				<MaskedText text={text} usedLetters={usedLetters} />
			</div>
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2">
				<Spider step={incorrectCount} />
				<LetterButtons
					onClick={handleClick}
					text={text}
					usedLetters={usedLetters}
				/>
			</div>
		</>
	);
}

export default PlayContainer;
