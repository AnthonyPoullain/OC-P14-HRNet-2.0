import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createEmployee } from '../../store/employeeSlice';
import generateRandomEmployee from '../../mockData/generateRandomEmployee';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';
import { INITIAL_VALUES, INPUTS } from './values';
import validationSchema from './validationSchema';

const TEST_MODE = true;

function CreateEmployee() {
	const dispatch = useDispatch();
	const [displayDialog, setDisplayDialog] = useState(false);

	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values, { resetForm }) => {
			dispatch(createEmployee(values));
			setDisplayDialog(true);
			resetForm();
		},
		validationSchema,
	});

	const handleGenerateData = () => {
		const mockData = generateRandomEmployee();
		formik.setValues(mockData);
	};

	return (
		<div className="container">
			<h1>Create Employee</h1>
			<form id="create-employee" onSubmit={formik.handleSubmit}>
				{INPUTS.map((input) => (
					<Field
						key={input.id}
						label={input.label}
						value={formik.values[input.id]}
						id={input.id}
						type={input.type}
						onChange={formik.handleChange}
						options={input.options}
						error={!!formik.touched[input.id] && !!formik.errors[input.id]}
						errorMessage={formik.errors[input.id] as string}
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
