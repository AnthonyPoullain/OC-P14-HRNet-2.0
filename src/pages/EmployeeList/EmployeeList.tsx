import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { clearRecords } from '../../features/manageEmployees/employeeSlice';

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
];

function EmployeeList() {
	const dispatch = useDispatch();

	const employees: Employee[] = useSelector(
		(state: RootState) => state.employees
	);

	const data = employees.map((employee) => [
		employee.firstName,
		employee.lastName,
		employee.startDate,
		employee.department,
		employee.dateOfBirth,
		employee.street,
		employee.city,
		employee.state,
		employee.zipCode,
	]);

	return (
		<div id="employee-div" className="container">
			<h1>Current Employees</h1>
			<Grid
				data={data}
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
					limit: 10,
				}}
			/>{' '}
			<button
				onClick={() => dispatch(clearRecords())}
				className="btn"
				style={{
					marginBottom: '40px',
					width: '200px',
					backgroundColor: 'var(--accent-color)',
				}}
				type="button"
			>
				Delete all records
			</button>
		</div>
	);
}

export default EmployeeList;
