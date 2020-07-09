import React from 'react';

const IMAGES = [
	require('./spider-00.svg'),
	require('./spider-01.svg'),
	require('./spider-02.svg'),
	require('./spider-03.svg'),
	require('./spider-04.svg'),
	require('./spider-05.svg'),
	require('./spider-06.svg'),
	require('./spider-07.svg'),
	require('./spider-08.svg'),
	require('./spider-09.svg'),
	require('./spider-10.svg')
];

type SpiderProps = {
	step?: number;
};

function Spider({ step = 0 }: SpiderProps) {
	const src =
		step >= IMAGES.length ? IMAGES[IMAGES.length - 1] : IMAGES[step];
	return (
		<div className="Spider">
			<img alt="Spider" src={src} />
		</div>
	);
}

export default Spider;
