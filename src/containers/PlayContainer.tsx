import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Callout from '../components/Callout/Callout';
import DifficultyPicker from '../components/DifficultyPicker/DifficultyPicker';
import LetterButtons from '../components/LetterButtons/LetterButtons';
import MaskedText from '../components/MaskedText/MaskedText';
import Spider from '../components/Spider/Spider';
import { addUsedLetter, setMaxIncorrect } from '../redux/modules/play';
import {
	selectCorrectCount,
	selectCurrentStep,
	selectIncorrectCount,
	selectInvalid,
	selectMaxIncorrect,
	selectText,
	selectTextLettersMap,
	selectUsedLetters
} from '../redux/selectors/play';

const DIFFICULTY_OPTIONS = [
	{ text: 'Easy', value: 10 },
	{ text: 'Medium', value: 6 },
	{ text: 'Hard', value: 4 }
];

function PlayContainer() {
	const dispatch = useDispatch();
	const history = useHistory();

	const correctCount = useSelector(selectCorrectCount);
	const incorrectCount = useSelector(selectIncorrectCount);
	const invalid = useSelector(selectInvalid);
	const maxIncorrect = useSelector(selectMaxIncorrect);
	const step = useSelector(selectCurrentStep);
	const text = useSelector(selectText);
	const textLetters = useSelector(selectTextLettersMap);
	const usedLetters = useSelector(selectUsedLetters);

	useEffect(() => {
		if (!text) {
			history.push('/start');
		}
	}, [history, text]);

	const loser = incorrectCount === maxIncorrect;
	const winner = correctCount === Object.keys(textLetters).length;

	const handleChange = (level: number) => {
		dispatch(setMaxIncorrect(level));
	};

	const handleClick = (letter: string) => {
		dispatch(addUsedLetter(letter));
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
			<Callout hidden={!invalid} type="warning">
				Text may contain invalid word(s).{' '}
				<span role="img" aria-label="confused emoji">
					😕
				</span>
			</Callout>
			<Callout hidden={!loser} type="error">
				Sorry. You lost.{' '}
				<span role="img" aria-label="sad emoji">
					😢
				</span>
			</Callout>
			<Callout hidden={!winner} type="success">
				Congratulations! You won!{' '}
				<span role="img" aria-label="smiley emoji">
					😁
				</span>
			</Callout>
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
