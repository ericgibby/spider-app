import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders spider heading', () => {
	render(<App />);
	const headingElement = screen.getByText(/spider/i);
	expect(headingElement).toBeInTheDocument();
});
