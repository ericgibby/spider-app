import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics, Epic } from 'redux-observable';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import play, { setTextEpic } from './modules/play';

export const rootEpic = combineEpics(setTextEpic) as Epic;

const rootReducer = combineReducers({
	play: persistReducer({ key: 'play', storage }, play)
});

export default rootReducer;
