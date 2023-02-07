import { h } from 'gridjs';
import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Table from '../../components/Table/Table';
import { RootState } from '../../store';
import { clearRecords, deleteEmployeeByIndex } from '../../store/employeeSlice';
import { getEmployeeIndex, getRowValues } from './helpers';

function EmployeeList() {
	const dispatch = useDispatch();
	const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
	const [displayDeleteAllModal, setDisplayDeleteAllModal] = useState(false);
	const currentRow = useRef(['']);
	const employeeIndex = useRef(0);

	/* Get employee list from global state */
	const employees: Employee[] = useSelector(
		(state: RootState) => state.employees
	);

	const handleDeleteEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
		currentRow.current = getRowValues(e);
		employeeIndex.current = getEmployeeIndex(employees, currentRow.current);
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
				<i className="fa-solid fa-trash-can" style={{ marginRight: '5px' }} />
				Delete all records
			</Button>

			{createPortal(
				<Modal
					title="Delete all employees?"
					message="This action cannot be undone."
					open={displayDeleteAllModal}
					onClose={() => setDisplayDeleteAllModal(false)}
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
					message={`${currentRow.current[0]} ${currentRow.current[1]}`}
					open={displayDeleteModal}
					onClose={() => setDisplayDeleteModal(false)}
					buttons={[
						{
							label: 'Delete',
							variant: 'secondary',
							onClick: () =>
								dispatch(deleteEmployeeByIndex(employeeIndex.current)),
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
