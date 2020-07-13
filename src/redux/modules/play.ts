import { createAction, createReducer } from '@reduxjs/toolkit';

// Action creators

export const setText = createAction<string>('play/SET_TEXT');

// Reducer

type PlayState = {
	text?: string;
	usedLetters: string[];
};

const reducer = createReducer({ usedLetters: [] } as PlayState, builder =>
	builder.addCase(setText, (state, { payload: text }) => ({ ...state, text }))
);

export default reducer;
