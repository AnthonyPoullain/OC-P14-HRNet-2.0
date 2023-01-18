import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../features/manageEmployees/employeeSlice';
import { getDepartments, getStates } from './createEmployeeData';
import generateRandomEmployee from '../../mockData/generateRandomEmployee';
import Field from '../../components/Field/Field';

const TEST_MODE = true;

function CreateEmployee() {
	const dispatch = useDispatch();

	const STATES = getStates();
	const DEPARTMENTS = getDepartments();

	const defaultFormData = {
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		startDate: '',
		street: '',
		city: '',
		state: STATES[0],
		zipCode: '',
		department: DEPARTMENTS[0],
	};

	const [formData, setFormData] = useState<Employee>(defaultFormData);

	const INPUTS: InputField[][] = [
		[
			{
				label: 'First Name',
				id: 'firstName',
				type: 'text',
			},
			{
				label: 'Last Name',
				id: 'lastName',
				type: 'text',
			},
			{
				label: 'Date of Birth',
				id: 'dateOfBirth',
				type: 'date',
			},
			{
				label: 'Start Date',
				id: 'startDate',
				type: 'date',
			},
		],
		[
			{
				label: 'Street',
				id: 'street',
				type: 'text',
			},
			{
				label: 'City',
				id: 'city',
				type: 'text',
			},
			{
				label: 'State',
				id: 'state',
				type: 'select',
				options: STATES,
			},
			{
				label: 'Zip Code',
				id: 'zipCode',
				type: 'text',
			},
		],
		[
			{
				label: 'Department',
				id: 'department',
				type: 'select',
				options: DEPARTMENTS,
			},
		],
	];

	function handleChange(
		inputKey: EmployeeDataField,
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const updatedValue = { [inputKey]: e.target.value };
		setFormData((data) => ({ ...data, ...updatedValue }));
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		dispatch(createEmployee(formData));
		window.alert('Employee added');
	}

	function handleGenerateData() {
		const mockData = generateRandomEmployee();
		const inputs = document.querySelectorAll<HTMLInputElement>('input,select');
		Object.values(formData).forEach((field, i) => {
			inputs[i].value = field;
		});
		setFormData({ ...mockData });
		/* dispatch(createEmployee(mockData)); */
	}

	useEffect(() => {
		console.table(formData);
	}, [formData]);

	return (
		<div className="container">
			<h1>Create Employee</h1>
			<form id="create-employee" onSubmit={(e) => handleSubmit(e)}>
				<div>
					{INPUTS[0].map((input) => (
						<Field
							key={input.id}
							label={input.label}
							id={input.id}
							type={input.type}
							value={formData[input.id]}
							onChange={(e) => handleChange(input.id, e)}
							options={input.options}
						/>
					))}
				</div>

				<fieldset className="address">
					<legend>Address</legend>
					{INPUTS[1].map((input) => (
						<Field
							key={input.id}
							label={input.label}
							id={input.id}
							type={input.type}
							value={formData[input.id]}
							onChange={(e) => handleChange(input.id, e)}
							options={input.options}
						/>
					))}
				</fieldset>

				<div>
					{INPUTS[2].map((input) => (
						<Field
							key={input.id}
							label={input.label}
							id={input.id}
							type={input.type}
							value={formData[input.id]}
							onChange={(e) => handleChange(input.id, e)}
							options={input.options}
						/>
					))}
					<button className="btn" type="submit">
						Save
					</button>
					{TEST_MODE ? (
						<button
							onClick={handleGenerateData}
							className="btn btn-secondary"
							type="button"
						>
							Generate random data
						</button>
					) : null}
				</div>
			</form>
		</div>
	);
}

export default CreateEmployee;
