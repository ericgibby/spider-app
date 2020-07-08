import React from 'react';
import { Link } from 'react-router-dom';

function PlayContainer() {
	return (
		<Link
			className="text-blue-600 underline hover:text-blue-700"
			to="/start"
		>
			Start Over
		</Link>
	);
}

export default PlayContainer;
