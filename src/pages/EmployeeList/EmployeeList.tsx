import { h } from 'gridjs';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { RootState } from '../../store';
import { clearRecords, deleteEmployeeByIndex } from '../../store/employeeSlice';
import styles from './EmployeeList.module.css';

function EmployeeList() {
	const dispatch = useDispatch();

	/* Get employee list from global state */
	const employees: Employee[] = useSelector(
		(state: RootState) => state.employees
	);

	const handleDeleteEmployee = (row: Row) => {
		const rowValues = row.cells.map((cell: Cell) => cell.data);
		rowValues.pop();
		const employeeIndex = employees.findIndex((employee: Employee) =>
			Object.values(employee).every((value) => rowValues.includes(value))
		);
		dispatch(deleteEmployeeByIndex(employeeIndex));
	};

	// Number of entries to display in the table
	const amountsOfEntries = [10, 25, 50, 100];
	const [nbOfEntries, setNbOfEntries] = useState(amountsOfEntries[0]);

	// Table Grid setup
	const COLUMNS = [
		'First name',
		'Last name',
		'Start date',
		'Department',
		'Date of birth',
		'Street',
		'City',
		'State',
		'Zip code',
		{
			name: 'Delete',
			formatter: (_: unknown, row: Row) =>
				h(
					'button',
					{
						className: 'btn btn-secondary',
						onClick: () => handleDeleteEmployee(row),
					},
					'Delete'
				),
		},
	];

	return (
		<div className="container">
			<h1>Current Employees</h1>

			<div className={styles.pagination_input}>
				<span>Show</span>
				<Field
					value={nbOfEntries.toString()}
					type="select"
					id="entries"
					options={amountsOfEntries}
					onChange={(e) => setNbOfEntries(Number(e.target.value))}
				/>
				<span>entries</span>
			</div>

			<Grid
				data={employees}
				columns={COLUMNS}
				search
				sort
				style={{
					table: {
						'font-size': '14px',
					},
					th: {
						'text-align': 'left',
						'padding-left': '20px',
						'padding-right': '10px',
						'vertical-align': 'center',
					},
					td: {
						width: '100px',
					},
				}}
				pagination={{
					enabled: true,
					limit: nbOfEntries,
				}}
			/>
			<Button variant="secondary" onClick={() => dispatch(clearRecords())}>
				<i className="fa-solid fa-trash-can" style={{ marginRight: '10px' }} />{' '}
				Delete all records
			</Button>
		</div>
	);
}

export default EmployeeList;
