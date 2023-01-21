import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import listenerMiddleware from './middleware';

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		listenerMiddleware.middleware,
	],
});

export type RootState = ReturnType<typeof store.getState>;
