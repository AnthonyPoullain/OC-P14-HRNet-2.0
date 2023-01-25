import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createEmployee } from '../../store/employeeSlice';
import { getDepartments, getStates } from './createEmployeeData';
import generateRandomEmployee from '../../mockData/generateRandomEmployee';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';
import validationSchema from './validationSchema';

const TEST_MODE = false;

function CreateEmployee() {
	const dispatch = useDispatch();
	const [displayDialog, setDisplayDialog] = useState(false);

	const STATES = getStates();
	const DEPARTMENTS = getDepartments();
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

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			dateOfBirth: '',
			startDate: '',
			street: '',
			city: '',
			state: STATES[0],
			zipCode: '',
			department: DEPARTMENTS[0],
		},
		onSubmit: (values) => {
			dispatch(createEmployee(values));
			setDisplayDialog(true);
		},
		validationSchema,
	});

	const handleGenerateData = () => {
		const mockData = generateRandomEmployee();
		dispatch(createEmployee(mockData));
		console.log('Employee created');
	};

	return (
		<div className="container">
			<h1>Create Employee</h1>
			<form id="create-employee" onSubmit={formik.handleSubmit}>
				<div>
					{INPUTS[0].map((input) => (
						<Field
							key={input.id}
							label={input.label}
							id={input.id}
							type={input.type}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							options={input.options}
							errorMessage={
								formik.touched[input.id] ? formik.errors[input.id] : ''
							}
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
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							options={input.options}
							errorMessage={
								formik.touched[input.id] ? formik.errors[input.id] : ''
							}
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
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							options={input.options}
							errorMessage={
								formik.touched[input.id] ? formik.errors[input.id] : ''
							}
						/>
					))}
					<button
						/* disabled={!formik.isValid} */
						onClick={() => window.scrollTo(0, 0)}
						className="btn"
						type="submit"
					>
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
