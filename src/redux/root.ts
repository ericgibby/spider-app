import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics, Epic } from 'redux-observable';
import play, { setTextEpic } from './modules/play';

export const rootEpic = combineEpics(setTextEpic) as Epic;

const rootReducer = combineReducers({ play });

export default rootReducer;
