import { createAction, createReducer } from '@reduxjs/toolkit';

export const DEFAULT_MAX_INCORRECT = 10;

// Action creators

export const addUsedLetter = createAction<string>('play/ADD_USED_LETTER');
export const setMaxIncorrect = createAction<number>('play/SET_MAX_INCORRECT');
export const setText = createAction<string>('play/SET_TEXT');

// Reducer

type PlayState = {
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
			.addCase(setMaxIncorrect, (state, { payload: maxIncorrect }) => ({
				...state,
				maxIncorrect
			}))
			.addCase(setText, (state, { payload: text }) => ({
				...state,
				text
			}))
);

export default reducer;
