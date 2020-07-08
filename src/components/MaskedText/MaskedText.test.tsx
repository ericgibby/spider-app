import React from 'react';
import { render, screen } from '@testing-library/react';
import MaskedText, { getCharacters } from './MaskedText';

describe('MaskedText module', () => {
	describe('getCharacters(..)', () => {
		it('inserts underscores for letters', () => {
			const characters = getCharacters('HELLO', []);
			expect(characters).toBe('_____');
		});

		it('does not insert underscores for non-letters', () => {
			const characters = getCharacters('HELLO WORLD!', []);
			expect(characters).toBe('_____ _____!');
		});

		it('shows letters that exist in the specified array', () => {
			const characters = getCharacters('HELLO WORLD!', ['L', 'O']);
			expect(characters).toBe('__LLO _O_L_!');
		});
	});

	describe('MaskedText component', () => {
		it('inserts underscores for letters', () => {
			render(<MaskedText text="HELLO" />);
			const text = screen.getAllByText('_');
			expect(text.length).toBe(5);
		});

		it('does not insert underscores for non-letters', () => {
			render(<MaskedText text="HELLO WORLD!" />);
			const underscores = screen.getAllByText('_');
			expect(underscores.length).toBe(10);
			const displayed = screen.getAllByText('!');
			expect(displayed.length).toBe(1);
		});

		it('shows letters that exist in the specified array', () => {
			render(<MaskedText text="HELLO WORLD!" usedLetters={['L', 'O']} />);
			const underscores = screen.getAllByText('_');
			expect(underscores.length).toBe(5);
			const displayed = screen.getAllByText(/[LO!]/);
			expect(displayed.length).toBe(6);
		});
	});
});
