/**
 * Get the values of a row
 * @param e The event
 */
export default function getRowValues(e: React.MouseEvent<HTMLButtonElement>) {
	const rowValues = [
		...(e.currentTarget.closest('tr') as HTMLTableRowElement).children,
	].map((item) => (item as HTMLElement).innerText);
	rowValues.pop();
	return rowValues;
}
