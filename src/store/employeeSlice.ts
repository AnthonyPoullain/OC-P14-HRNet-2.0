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
		},
		deleteEmployeeByIndex: (state, action) => {
			state.splice(action.payload, 1);
		},
		clearRecords: (state) => {
			state.splice(0, state.length);
		},
	},
});

export const { createEmployee, deleteEmployeeByIndex, clearRecords } =
	employeeSlice.actions;

export default employeeSlice.reducer;
