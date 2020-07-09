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
			(text || '').split('').reduce((obj, letter) => {
				// We only care about characters between 65-90 (A-Z)
				const code = letter.charCodeAt(0);
				if (code >= 65 && code <= 90) {
					return { ...obj, [letter]: true };
				}
				return obj;
			}, {} as { [letter: string]: boolean }),
		[text]
	);

	const [correctCount, incorrectCount] = useMemo(
		() =>
			usedLetters.reduce(
				([correct, incorrect], letter) =>
					textLetters[letter]
						? [correct + 1, incorrect]
						: [correct, incorrect + 1],
				[0, 0]
			),
		[textLetters, usedLetters]
	);

	const loser = incorrectCount === MAX_INCORRECT;
	const winner = correctCount === Object.keys(textLetters).length;

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
			{loser && (
				<div className="p-6 bg-red-200 border border-red-500 rounded-md">
					Sorry. You lost.{' '}
					<span role="img" aria-label="sad emoji">
						😢
					</span>
				</div>
			)}
			{winner && (
				<div className="p-6 bg-blue-200 border border-blue-500 rounded-md">
					Congratulations! You won!{' '}
					<span role="img" aria-label="smiley emoji">
						😁
					</span>
				</div>
			)}
			<div className="mb-6 py-4 border-b border-gray-500 text-center">
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
