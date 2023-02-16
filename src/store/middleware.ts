import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { clearRecords, createEmployee, deleteEmployee } from './employeeSlice';
import type { RootState } from './index';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(createEmployee, deleteEmployee, clearRecords),
	effect: (_, listenerApi) =>
		localStorage.setItem(
			'employees',
			JSON.stringify((listenerApi.getState() as RootState).employees)
		),
});

export default listenerMiddleware;
