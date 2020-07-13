import React, { ReactNode, ReactNodeArray } from 'react';

type CalloutProps = {
	children?: ReactNode | ReactNodeArray;
	hidden?: boolean;
	type?: 'error' | 'success' | 'warning';
};

function Callout({ children, hidden, type }: CalloutProps) {
	return hidden ? null : (
		<div
			className={`mt-4 p-6 border rounded-md${
				type === 'error' ? ' bg-red-200 border-red-500' : ''
			}${type === 'success' ? ' bg-blue-200 border-blue-500' : ''}${
				type === 'warning' ? ' bg-orange-200 border-orange-500' : ''
			}${!type ? ' bg-gray-200 border-gray-500' : ''}`}
		>
			{children}
		</div>
	);
}

export default Callout;
