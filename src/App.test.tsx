import { render, screen } from '@testing-library/react';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
	it('renders spider heading', () => {
		render(
			<StaticRouter location="/start">
				<App />
			</StaticRouter>
		);
		const headingElement = screen.getByText(/spider/i);
		expect(headingElement).toBeInTheDocument();
	});
});
