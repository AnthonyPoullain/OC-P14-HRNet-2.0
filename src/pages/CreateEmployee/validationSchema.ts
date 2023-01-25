import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(3, 'First name should be at least 3 characters long')
		.matches(/[a-zA-Z -.]/, 'First name should contain only letters')
		.required('First name is required'),
	lastName: Yup.string()
		.min(3, 'Last name should be at least 3 characters long')
		.matches(/[a-zA-Z -.]/, 'Last name should contain only letters')
		.required('Last name is required'),
	dateOfBirth: Yup.date().required('Date of birth is required'),
	startDate: Yup.date().required('Start date is required'),
	street: Yup.string()
		.matches(/[a-zA-Z0-9 -.]/, 'Street should contain only letters/numbers')
		.required('Street is required'),
	city: Yup.string()
		.matches(/[a-zA-Z -.]/, 'City should contain only letters')
		.required('City is required'),
	zipCode: Yup.string()
		.matches(/[0-9]{5}/, 'Invalid zip code')
		.required('Zip code is required'),
});

export default validationSchema;
