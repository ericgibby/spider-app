import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import reducer, { rootEpic } from './root';

const defaultMiddleware = getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [
			// 👇 These are from a 3rd party library, so we'll just have to ignore them.
			'persist/PERSIST',
			'persist/REHYDRATE'
		]
	}
});
const epicMiddleware = createEpicMiddleware();
const middleware = [...defaultMiddleware, epicMiddleware];

const store = configureStore({ middleware, reducer });

epicMiddleware.run(rootEpic);

export default store;
