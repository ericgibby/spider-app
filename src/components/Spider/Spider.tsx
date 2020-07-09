import React from 'react';
import spider00 from './spider-00.svg';
import spider01 from './spider-01.svg';
import spider02 from './spider-02.svg';
import spider03 from './spider-03.svg';
import spider04 from './spider-04.svg';
import spider05 from './spider-05.svg';
import spider06 from './spider-06.svg';
import spider07 from './spider-07.svg';
import spider08 from './spider-08.svg';
import spider09 from './spider-09.svg';
import spider10 from './spider-10.svg';

const IMAGES = [
	spider00,
	spider01,
	spider02,
	spider03,
	spider04,
	spider05,
	spider06,
	spider07,
	spider08,
	spider09,
	spider10
];

type SpiderProps = {
	step?: number;
};

function Spider({ step = 0 }: SpiderProps) {
	const src = IMAGES[step];
	return (
		<div className="Spider">
			<img alt="Spider" src={src} />
		</div>
	);
}

export default Spider;
