import { createSlice } from '@reduxjs/toolkit';

const employeesInStorage = localStorage.getItem('employees');
const employees: Employee[] | [] = employeesInStorage
	? JSON.parse(employeesInStorage)
	: [];

export const employeeSlice = createSlice({
	name: 'employees',
	initialState: employees,
	reducers: {
		createEmployee: (state: Employee[], action) => {
			state.push(action.payload);
			localStorage.setItem('employees', JSON.stringify(state));
		},
		clearRecords: (state) => {
			/* state.pop(); */
			state.splice(0, state.length);
			localStorage.removeItem('employees');
		},
	},
});

export const { createEmployee, clearRecords } = employeeSlice.actions;

export default employeeSlice.reducer;
