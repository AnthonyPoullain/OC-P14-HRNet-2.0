interface InputField {
	label: string;
	type: 'text' | 'password' | 'email' | 'select' | 'date';
	options?: string[];
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Employee {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	startDate: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	department: string;
}

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
