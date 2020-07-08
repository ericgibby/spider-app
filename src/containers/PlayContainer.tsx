import React from 'react';
import { Link } from 'react-router-dom';
import MaskedText from '../components/MaskedText/MaskedText';

type PlayContainerProps = {
	text?: string;
};

function PlayContainer({ text }: PlayContainerProps) {
	return (
		<>
			<Link
				className="text-blue-600 underline hover:text-blue-700"
				to="/start"
			>
				Start Over
			</Link>
			<MaskedText text={text} />
		</>
	);
}

export default PlayContainer;
