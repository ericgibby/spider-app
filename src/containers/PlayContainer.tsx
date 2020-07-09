import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LetterButtons from '../components/LetterButtons/LetterButtons';
import MaskedText from '../components/MaskedText/MaskedText';

type PlayContainerProps = {
	text?: string;
};

function PlayContainer({ text }: PlayContainerProps) {
	const [usedLetters, setUsedLetters] = useState<string[]>([]);

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
			<MaskedText text={text} usedLetters={usedLetters} />
			<LetterButtons
				onClick={handleClick}
				text={text}
				usedLetters={usedLetters}
			/>
		</>
	);
}

export default PlayContainer;
