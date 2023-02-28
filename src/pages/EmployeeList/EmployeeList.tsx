import { h } from 'gridjs';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-quick-modal';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { RootState } from '../../store';
import { clearRecords, deleteEmployee } from '../../store/employeeSlice';
import getRowValues from './helpers';
import './EmployeeList.css';

function EmployeeList() {
	const dispatch = useDispatch();

	// Get employee list from global state
	const employees: Employee[] = useSelector(
		(state: RootState) => state.employees
	);

	// Handle modal display
	const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
	const [displayDeleteAllModal, setDisplayDeleteAllModal] = useState(false);

	// Delete a specific employee
	const currentRow = useRef(['']);

	const handleDeleteEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
		currentRow.current = getRowValues(e);
		setDisplayDeleteModal(!displayDeleteModal);
	};

	// Table Grid setup
	const columns = useMemo(
		() => [
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
				formatter: () =>
					h(
						// @ts-ignore
						'button',
						{
							className: 'btn',
							onClick: handleDeleteEmployee,
							style: { margin: '0', minWidth: '0' },
						},
						''
					),
			},
		],
		[]
	);

	return (
		<div className="container">
			<h1>Current Employees</h1>

			<Table data={employees} columns={columns} />

			<Button
				variant="secondary"
				onClick={() => setDisplayDeleteAllModal(!displayDeleteAllModal)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
				</svg>
				Delete all records
			</Button>

			<Modal
				title="Delete employee?"
				content={`${currentRow.current[0]} ${currentRow.current[1]}`}
				open={displayDeleteModal}
				onClose={() => setDisplayDeleteModal(false)}
				portalSelector="#portal"
				buttons={[
					{
						label: 'Delete',
						variant: 'secondary',
						onClick: () => dispatch(deleteEmployee(currentRow.current)),
					},
					{
						label: 'Cancel',
					},
				]}
			/>

			<Modal
				title="Delete all employees?"
				content="This action cannot be undone."
				open={displayDeleteAllModal}
				onClose={() => setDisplayDeleteAllModal(false)}
				portalSelector="#portal"
				buttons={[
					{
						label: 'Delete',
						variant: 'secondary',
						timer: 5,
						onClick: () => dispatch(clearRecords()),
					},
					{
						label: 'Cancel',
					},
				]}
			/>
		</div>
	);
}

export default EmployeeList;
