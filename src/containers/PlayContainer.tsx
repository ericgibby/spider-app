import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DifficultyPicker from '../components/DifficultyPicker/DifficultyPicker';
import LetterButtons from '../components/LetterButtons/LetterButtons';
import MaskedText from '../components/MaskedText/MaskedText';
import Spider from '../components/Spider/Spider';

const DEFAULT_MAX_INCORRECT = 10;

const DIFFICULTY_OPTIONS = [
	{ text: 'Easy', value: 10 },
	{ text: 'Medium', value: 6 },
	{ text: 'Hard', value: 4 }
];

type PlayContainerProps = {
	text?: string;
};

function PlayContainer({ text }: PlayContainerProps) {
	const history = useHistory();

	useEffect(() => {
		if (!text) {
			history.push('/start');
		}
	}, [history, text]);

	const [usedLetters, setUsedLetters] = useState<string[]>([]);
	const [maxIncorrect, setMaxIncorrect] = useState(DEFAULT_MAX_INCORRECT);

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

	const loser = incorrectCount === maxIncorrect;
	const winner = correctCount === Object.keys(textLetters).length;
	const step = getCurrentStep(incorrectCount, maxIncorrect);

	const handleChange = (level: number) => {
		setMaxIncorrect(level);
	};

	const handleClick = (letter: string) => {
		setUsedLetters(previous => [...previous, letter]);
	};

	return (
		<>
			<div className="flex flex-col md:flex-row md:items-center md:justify-between">
				<DifficultyPicker
					disabled={usedLetters.length > 0}
					onChange={handleChange}
					options={DIFFICULTY_OPTIONS}
					value={maxIncorrect}
				/>
				<div className="mt-2 md:mt-0">
					<Link
						className="px-4 py-2 border border-blue-700 hover:border-blue-800 rounded-md text-blue-700 hover:text-blue-800"
						to="/start"
					>
						Start Over
					</Link>
				</div>
			</div>
			{loser && (
				<div className="mt-4 p-6 bg-red-200 border border-red-500 rounded-md">
					Sorry. You lost.{' '}
					<span role="img" aria-label="sad emoji">
						😢
					</span>
				</div>
			)}
			{winner && (
				<div className="mt-4 p-6 bg-blue-200 border border-blue-500 rounded-md">
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
				<Spider step={step} />
				<LetterButtons
					disabled={winner || loser}
					onClick={handleClick}
					text={text}
					usedLetters={usedLetters}
				/>
			</div>
		</>
	);
}

export default PlayContainer;

function getCurrentStep(incorrectCount: number, maxIncorrect: number) {
	if (incorrectCount <= 2) {
		return incorrectCount;
	}
	if (maxIncorrect === 6) {
		return [4, 6, 8, 10][incorrectCount - 3];
	}
	if (maxIncorrect === 4) {
		return [6, 10][incorrectCount - 3];
	}
	return incorrectCount;
}
