import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../store/employeeSlice';
import { getDepartments, getStates } from './createEmployeeData';
import generateRandomEmployee from '../../mockData/generateRandomEmployee';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';

const TEST_MODE = true;

function CreateEmployee() {
	const dispatch = useDispatch();
	const [displayDialog, setDisplayDialog] = useState(false);

	const STATES = getStates();
	const DEPARTMENTS = getDepartments();

	const defaultValues = {
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

	const [values, setValues] = useState<Employee>(defaultValues);

	const INPUTS: InputField[][] = [
		[
			{
				label: 'First Name',
				id: 'firstName',
				type: 'text',
				errorMessage:
					'First Name should be at least 3 characters long and contain only letters.',
				pattern: '^[a-zA-Z -]{3,}$',
				required: true,
			},
			{
				label: 'Last Name',
				id: 'lastName',
				type: 'text',
				errorMessage:
					'Last Name should be at least 3 characters long and contain only letters.',
				pattern: '^[a-zA-Z -]{3,}$',
				required: true,
			},
			{
				label: 'Date of Birth',
				id: 'dateOfBirth',
				type: 'date',
				errorMessage: 'Please select a date.',
				required: true,
			},
			{
				label: 'Start Date',
				id: 'startDate',
				type: 'date',
				errorMessage: 'Please select a date.',
				required: true,
			},
		],
		[
			{
				label: 'Street',
				id: 'street',
				type: 'text',
				pattern: '^[a-zA-Z0-9 -]{3,}$',
				errorMessage: 'Invalid street format.',
				required: true,
			},
			{
				label: 'City',
				id: 'city',
				type: 'text',
				pattern: '^[a-zA-Z -]{3,}$',
				errorMessage: 'Invalid city format.',
				required: true,
			},
			{
				label: 'State',
				id: 'state',
				type: 'select',
				options: STATES,
				required: true,
			},
			{
				label: 'Zip Code',
				id: 'zipCode',
				type: 'text',
				errorMessage: 'Invalid zip code.',
				pattern: '[0-9]{5}',
				required: true,
			},
		],
		[
			{
				label: 'Department',
				id: 'department',
				type: 'select',
				options: DEPARTMENTS,
				required: true,
			},
		],
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const updatedValue = { [e.target.id]: e.target.value };
		setValues((data) => ({ ...data, ...updatedValue }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createEmployee(values));
		setValues(defaultValues);
		setDisplayDialog(true);
	};

	const handleGenerateData = () => {
		const mockData = generateRandomEmployee();
		const inputs = document.querySelectorAll<HTMLInputElement>('input,select');
		Object.values(values).forEach((field, i) => {
			inputs[i].value = field;
		});
		setValues({ ...mockData });
	};

	useEffect(() => {
		console.table(values);
	}, [values]);

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
							value={values[input.id]}
							onChange={handleChange}
							options={input.options}
							errorMessage={input.errorMessage}
							pattern={input.pattern}
							required={input.required}
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
							value={values[input.id]}
							onChange={handleChange}
							options={input.options}
							errorMessage={input.errorMessage}
							pattern={input.pattern}
							required={input.required}
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
							value={values[input.id]}
							onChange={handleChange}
							options={input.options}
							errorMessage={input.errorMessage}
							pattern={input.pattern}
							required={input.required}
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
			{displayDialog ? (
				<Modal
					title="Confirmation"
					message="User created successfully!"
					buttonText="Close"
					onClick={() => setDisplayDialog((display) => !display)}
				/>
			) : null}
		</div>
	);
}

export default CreateEmployee;
