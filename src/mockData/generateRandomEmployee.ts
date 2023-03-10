import { faker } from '@faker-js/faker';

export default function generateRandomEmployee() {
	const MyDate = new Date();

	return {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		dateOfBirth: `${MyDate.getFullYear()}-${`0${MyDate.getMonth() + 1}`.slice(
			-2
		)}-${`0${MyDate.getDate()}`.slice(-2)}`,
		startDate: `${MyDate.getFullYear()}-${`0${MyDate.getMonth() + 1}`.slice(
			-2
		)}-${`0${MyDate.getDate()}`.slice(-2)}`,

		street: faker.address.street(),
		city: faker.address.cityName(),
		state: faker.address.state(),
		zipCode: faker.address.zipCode('#####'),
		department: faker.name.jobArea(),
	};
}
