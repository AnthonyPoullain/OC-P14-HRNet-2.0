/**
 * Get the values of a row
 *
 * @param {Row} row
 */
export function getRowValues(row: Row) {
	return row.cells.map((cell: Cell) => cell.data);
}

/**
 * Get the index of an employee in the employee list
 *
 * @param {Employee[]} employeeList
 * @param {string[]} rowValues
 */
export function getEmployeeIndex(
	employeeList: Employee[],
	rowValues: string[]
) {
	return employeeList.findIndex((employee: Employee) =>
		Object.values(employee).every((value) => rowValues.includes(value))
	);
}
