import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createPortal } from 'react-dom';
import { createEmployee } from '../../store/employeeSlice';
import generateRandomEmployee from '../../mockData/generateRandomEmployee';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import { INITIAL_VALUES, INPUTS } from './values';
import validationSchema from './validationSchema';
import getStateAbbreviation from './helpers';

/* If true, displays a 'Generate random data' button at the bototm of the page to quickly 
fill in the input fields with formatted data. */
const TEST_MODE = true;

function CreateEmployee() {
	const dispatch = useDispatch();
	const [displayDialog, setDisplayDialog] = useState(false);

	// Setup form
	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values, { resetForm }) => {
			const updatedValues = {
				...values,
				state: getStateAbbreviation(values.state),
			};
			dispatch(createEmployee(updatedValues));
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
						errorMessage={formik.errors[input.id]}
					/>
				))}
				<Button
					/* disabled={!formik.isValid} */
					type="submit"
					fullWidth
					onClick={() => window.scrollTo(0, 0)}
				>
					Save
				</Button>
				{TEST_MODE ? (
					<Button fullWidth onClick={handleGenerateData} variant="secondary">
						Generate random data
					</Button>
				) : null}
			</form>
			{createPortal(
				<Modal
					title="Confirmation"
					message="User created successfully!"
					open={displayDialog}
					onClose={() => setDisplayDialog(!displayDialog)}
				/>,
				document.getElementById('portal') as HTMLElement
			)}
		</div>
	);
}

export default CreateEmployee;
