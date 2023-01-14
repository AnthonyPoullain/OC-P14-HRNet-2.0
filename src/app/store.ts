import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/manageEmployees/employeeSlice';

export const store = configureStore({
	reducer: {
		employees: employeeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
