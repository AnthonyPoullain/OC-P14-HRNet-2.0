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
		deleteEmployee: (state, action) => {
			state.filter((employee, index, arr) => {
				if (
					JSON.stringify(Object.values(employee).sort()) ===
					JSON.stringify(action.payload.sort())
				) {
					arr.splice(index, 1);
					return true;
				}
				return false;
			});
		},
		clearRecords: (state) => {
			state.splice(0, state.length);
		},
	},
});

export const { createEmployee, deleteEmployee, clearRecords } =
	employeeSlice.actions;

export default employeeSlice.reducer;
