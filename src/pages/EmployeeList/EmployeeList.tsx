import { h } from 'gridjs';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';
import { RootState } from '../../store';
import { clearRecords, deleteEmployeeByIndex } from '../../store/employeeSlice';
import styles from './EmployeeList.module.css';
import { getEmployeeIndex, getRowValues } from './helpers';

function EmployeeList() {
	const dispatch = useDispatch();
	const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
	const [displayDeleteAllModal, setDisplayDeleteAllModal] = useState(false);
	const [currentRow, setCurrentRow] = useState(['']);
	const [currentIndex, setCurrentIndex] = useState(0);

	console.log('render');

	/* Get employee list from global state */
	const employees: Employee[] = useSelector(
		(state: RootState) => state.employees
	);

	const handleDeleteEmployee = (row: Row) => {
		const rowValues = getRowValues(row);
		rowValues.pop(); // Remove last row of table as it contains the 'Delete' button and no data
		setCurrentRow(rowValues);
		const employeeIndex = getEmployeeIndex(employees, rowValues);
		setCurrentIndex(employeeIndex);
		setDisplayDeleteModal(!displayDeleteModal);
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
						className: 'btn',
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
			<Button
				variant="secondary"
				onClick={() => setDisplayDeleteAllModal(!displayDeleteAllModal)}
			>
				<i className="fa-solid fa-trash-can" style={{ marginRight: '5px' }} />{' '}
				Delete all records
			</Button>

			{createPortal(
				<Modal
					title="Delete all employees?"
					message="This action cannot be undone."
					open={displayDeleteAllModal}
					onClose={() => setDisplayDeleteAllModal(!displayDeleteAllModal)}
					buttons={[
						{
							label: 'Delete',
							variant: 'secondary',
							onClick: () => dispatch(clearRecords()),
						},
						{
							label: 'Cancel',
						},
					]}
				/>,
				document.getElementById('portal') as HTMLElement
			)}

			{createPortal(
				<Modal
					title="Delete employee?"
					message={`${currentRow[0]} ${currentRow[1]}`}
					open={displayDeleteModal}
					onClose={() => setDisplayDeleteModal(!displayDeleteModal)}
					buttons={[
						{
							label: 'Delete',
							variant: 'secondary',
							onClick: () => dispatch(deleteEmployeeByIndex(currentIndex)),
						},
						{
							label: 'Cancel',
						},
					]}
				/>,
				document.getElementById('portal') as HTMLElement
			)}
		</div>
	);
}

export default EmployeeList;
