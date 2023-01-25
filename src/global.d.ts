type EmployeeDataField =
	| 'firstName'
	| 'lastName'
	| 'dateOfBirth'
	| 'startDate'
	| 'street'
	| 'city'
	| 'state'
	| 'zipCode'
	| 'department';

interface InputField {
	label: string;
	type: 'text' | 'password' | 'email' | 'select' | 'date';
	id: EmployeeDataField;
	value?: string;
	options?: string[];
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	errorMessage?: string;
}

interface Employee {
	firstName: string;
	lastName: string;
	dateOfBirth: string | date;
	startDate: string | date;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	department: string;
}
