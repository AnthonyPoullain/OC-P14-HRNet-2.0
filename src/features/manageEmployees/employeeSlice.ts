import { createSlice } from '@reduxjs/toolkit';

const employeesInStorage = localStorage.getItem('employees');
const employees: Employee[] | [] = employeesInStorage
	? JSON.parse(employeesInStorage)
	: [];

export const employeeSlice = createSlice({
	name: 'employees',
	initialState: employees,
	reducers: {
		addEmployee: (state: Employee[], action) => {
			state.push(action.payload);
			localStorage.setItem('employees', JSON.stringify(state));
		},
	},
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
