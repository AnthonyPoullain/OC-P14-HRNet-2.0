import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createEmployee } from '../../store/employeeSlice';
import Field from '../../components/Field/Field';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import { INITIAL_VALUES, INPUTS } from './values';
import validationSchema from './validationSchema';
import getStateAbbreviation from './helpers';

/* If true, displays a 'Generate random data' button at the bototm of the page to quickly 
fill in the input fields with formatted data. */
const DEV_MODE = !(process.env.NODE_ENV === 'production');

function CreateEmployee() {
	const dispatch = useDispatch();
	const [displayModal, setDisplayModal] = useState(false);

	// Setup form
	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: (values, { resetForm }) => {
			const updatedValues = {
				...values,
				state: getStateAbbreviation(values.state),
			};
			dispatch(createEmployee(updatedValues));
			setDisplayModal(true);
			resetForm();
		},
		validationSchema,
	});

	useEffect(() => {
		if (!formik.isValid) {
			document.querySelector('.error')?.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [formik.isSubmitting]);

	const handleGenerateData = async () => {
		if (DEV_MODE) {
			const module = await import('../../mockData/generateRandomEmployee');
			const generateRandomEmployee = module.default;
			const mockData = generateRandomEmployee();
			formik.setValues(mockData);
		}
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
				<Button type="submit" fullWidth>
					Save
				</Button>
				{DEV_MODE ? (
					<Button fullWidth onClick={handleGenerateData} variant="secondary">
						Generate random data
					</Button>
				) : null}
			</form>

			<Modal
				title="Confirmation"
				content="User created successfully!"
				open={displayModal}
				onClose={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
					setDisplayModal(!displayModal);
				}}
				portalSelector="#portal"
			/>
		</div>
	);
}

export default CreateEmployee;
