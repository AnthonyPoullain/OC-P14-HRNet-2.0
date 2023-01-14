import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../features/manageEmployees/employeeSlice';
import { getDepartments, getStates } from './createEmployeeData';

function CreateEmployee() {
	const dispatch = useDispatch();

	const STATES = getStates();
	const DEPARTMENTS = getDepartments();

	const [formData, setEmployee] = useState<Employee>({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		startDate: '',
		street: '',
		city: '',
		state: STATES[0],
		zipCode: '',
		department: DEPARTMENTS[0],
	} as Employee);

	function handleChange(
		inputKey: EmployeeDataField,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const updatedValue = { [inputKey]: e.target.value };
		setEmployee((data) => ({ ...data, ...updatedValue }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(addEmployee(formData));
		window.alert('Employee added');
	}

	/* useEffect(() => { */
	/* 	console.table(formData); */
	/* }, [formData]); */

	return (
		<div className="container">
			<h1>Create Employee</h1>
			<form id="create-employee" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="first-name">First Name</label>
				<input
					type="text"
					id="first-name"
					onChange={(e) => handleChange('firstName', e)}
				/>

				<label htmlFor="last-name">Last Name</label>
				<input
					type="text"
					id="last-name"
					onChange={(e) => handleChange('lastName', e)}
				/>

				<label htmlFor="date-of-birth">Date of Birth</label>
				<input
					id="date-of-birth"
					type="date"
					onChange={(e) => handleChange('dateOfBirth', e)}
				/>

				<label htmlFor="start-date">Start Date</label>
				<input
					id="start-date"
					type="date"
					onChange={(e) => handleChange('startDate', e)}
				/>

				<fieldset className="address">
					<legend>Address</legend>

					<label htmlFor="street">Street</label>
					<input
						id="street"
						type="text"
						onChange={(e) => handleChange('street', e)}
					/>

					<label htmlFor="city">City</label>
					<input
						id="city"
						type="text"
						onChange={(e) => handleChange('city', e)}
					/>

					<label htmlFor="state">State</label>
					<select
						name="state"
						id="state"
						onChange={(e) => handleChange('state', e)}
					>
						{STATES.map((item) => (
							<option key={crypto.randomUUID()}>{item}</option>
						))}
					</select>

					<label htmlFor="zip-code">Zip Code</label>
					<input
						id="zip-code"
						type="number"
						onChange={(e) => handleChange('zipCode', e)}
					/>
				</fieldset>

				<label htmlFor="department">Department</label>
				<select
					name="department"
					id="department"
					onChange={(e) => handleChange('department', e)}
				>
					{DEPARTMENTS.map((item) => (
						<option key={crypto.randomUUID()}>{item}</option>
					))}
				</select>
				<button type="submit">Save</button>
			</form>
		</div>
	);
}

export default CreateEmployee;
