import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import reducer, { rootEpic } from './root';

const defaultMiddleware = getDefaultMiddleware();
const epicMiddleware = createEpicMiddleware();
const middleware = [...defaultMiddleware, epicMiddleware];

const store = configureStore({ middleware, reducer });

epicMiddleware.run(rootEpic);

export default store;
