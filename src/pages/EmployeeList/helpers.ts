/**
 * Get the values of a row
 * @param e The event
 */
export function getRowValues(e: React.MouseEvent<HTMLButtonElement>) {
	const rowValues = [
		...(e.currentTarget.closest('tr') as HTMLTableRowElement).children,
	].map((item) => (item as HTMLElement).innerText);
	rowValues.pop();
	return rowValues;
}

/**
 * Get the index of an employee in the employee list
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
