import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ActionsObservable, ofType } from 'redux-observable';
import { forkJoin, of, from } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { lookupWord } from '../../services/dictionaryApi';

export const DEFAULT_MAX_INCORRECT = 10;

// Action creators

export const addUsedLetter = createAction<string>('play/ADD_USED_LETTER');
export const setInvalid = createAction<boolean>('play/SET_INVALID');
export const setMaxIncorrect = createAction<number>('play/SET_MAX_INCORRECT');
export const setText = createAction<string>('play/SET_TEXT');

// Epics

export function setTextEpic(action$: ActionsObservable<PayloadAction<string>>) {
	return action$.pipe(
		ofType(setText.type),
		filter(({ payload }) => !!payload),
		switchMap(({ payload: text }) => {
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
				return from(lookupWord(word));
			});

			// Wait for all requests, then check validity of each word
			return forkJoin(lookups).pipe(
				map(results => {
					const invalid = !results.reduce((valid, results, index) => {
						return (
							valid &&
							results.some(({ meta }) => {
								return (
									meta?.stems.includes(words[index]) || false
								);
							})
						);
					}, true);
					return setInvalid(invalid);
				}),
				catchError(err => {
					console.error(err);

					// Don't want to potentially show a false warning if there
					// is an API error.
					return of(setInvalid(false));
				})
			);
		})
	);
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
			.addCase(setText, (state, { payload: text }) => ({
				...state,
				text: text?.toUpperCase(),
				usedLetters: []
			}))
);

export default reducer;
