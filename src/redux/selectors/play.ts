import { createSelector } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

export function selectMaxIncorrect(state: RootStateOrAny) {
	return state.play.maxIncorrect as number;
}

export function selectText(state: RootStateOrAny) {
	return state.play.text as string;
}

export function selectUsedLetters(state: RootStateOrAny) {
	return state.play.usedLetters as string[];
}

// Memoized selectors

export const selectTextLettersMap = createSelector([selectText], text =>
	(text || '').split('').reduce((obj, letter) => {
		// We only care about characters between 65-90 (A-Z)
		const code = letter.charCodeAt(0);
		if (code >= 65 && code <= 90) {
			return { ...obj, [letter]: true };
		}
		return obj;
	}, {} as { [letter: string]: boolean })
);

export const selectCorrectCount = createSelector(
	[selectTextLettersMap, selectUsedLetters],
	(textLetters, usedLetters) =>
		usedLetters.reduce(
			(correct, letter) => (textLetters[letter] ? correct + 1 : correct),
			0
		)
);

export const selectIncorrectCount = createSelector(
	[selectTextLettersMap, selectUsedLetters],
	(textLetters, usedLetters) =>
		usedLetters.reduce(
			(incorrect, letter) =>
				!textLetters[letter] ? incorrect + 1 : incorrect,
			0
		)
);
