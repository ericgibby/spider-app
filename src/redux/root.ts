import { combineReducers } from '@reduxjs/toolkit';
import play from './modules/play';

const rootReducer = combineReducers({ play });

export default rootReducer;
