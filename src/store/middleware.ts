import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
	clearRecords,
	createEmployee,
	deleteEmployeeByIndex,
} from './employeeSlice';
import type { RootState } from './index';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(createEmployee, deleteEmployeeByIndex, clearRecords),
	effect: (_, listenerApi) =>
		localStorage.setItem(
			'employees',
			JSON.stringify((listenerApi.getState() as RootState).employees)
		),
});

export default listenerMiddleware;
