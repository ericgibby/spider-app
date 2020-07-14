import { createAction, createReducer, Dispatch } from '@reduxjs/toolkit';
import { lookupWord } from '../../services/dictionaryApi';

export const DEFAULT_MAX_INCORRECT = 10;

// Action creators

export const addUsedLetter = createAction<string>('play/ADD_USED_LETTER');
export const setInvalid = createAction<boolean>('play/SET_INVALID');
export const setMaxIncorrect = createAction<number>('play/SET_MAX_INCORRECT');
export const updateText = createAction<string>('play/UPDATE_TEXT');

// Thunks

export function setText(text: string) {
	return async (dispatch: Dispatch) => {
		try {
			// Get list of unique words
			const words = Object.keys(
				// Split on white space to get individual words
				text.split(/\s/).reduce((obj, word) => {
					// Remove non-alpha characters at beginning or end of word
					const key = word
						.replace(/^[^\w]+|[^\w]+$/, '')
						.toLowerCase();
					return { ...obj, [key]: true };
				}, {} as { [key: string]: boolean })
			);
			// Make individual requests in parallel
			const lookups = words.map(word => {
				return lookupWord(word);
			});
			// Wait for all requests, then check validity of each word
			const responses = await Promise.all(lookups);
			const invalid = !responses.reduce((valid, results) => {
				return (
					valid &&
					results.some(({ meta }, index) => {
						return meta?.stems.includes(words[index]) || false;
					})
				);
			}, true);
			dispatch(setInvalid(invalid));
		} catch (err) {
			console.error(err);

			// Don't want to prevent play if there is an API error, and don't
			// want to potentially show a false warning.
			dispatch(setInvalid(false));
		} finally {
			dispatch(updateText(text.toUpperCase()));
		}
	};
}

// Reducer

type PlayState = {
	invalid?: boolean;
	maxIncorrect: number;
	text?: string;
	usedLetters: string[];
};

const reducer = createReducer(
	{ maxIncorrect: DEFAULT_MAX_INCORRECT, usedLetters: [] } as PlayState,
	builder =>
		builder
			.addCase(
				addUsedLetter,
				({ usedLetters, ...state }, { payload }) => ({
					...state,
					usedLetters: [...usedLetters, payload]
				})
			)
			.addCase(setInvalid, (state, { payload: invalid }) => ({
				...state,
				invalid
			}))
			.addCase(setMaxIncorrect, (state, { payload: maxIncorrect }) => ({
				...state,
				maxIncorrect
			}))
			.addCase(updateText, (state, { payload: text }) => ({
				...state,
				text,
				usedLetters: []
			}))
);

export default reducer;
