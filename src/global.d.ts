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

interface Employee {
	[key: string]: string;
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

interface InputField {
	label?: string;
	type: 'text' | 'password' | 'email' | 'select' | 'date';
	id: string;
	value?: string | number;
	options?: string[] | number[];
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void;
	onBlur?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	error?: boolean;
	errorMessage?: string;
}

interface Btn {
	variant?: 'primary' | 'secondary';
	type?: 'submit' | 'button';
	onClick: () => void;
	children?: React.ReactNode;
	disabled?: boolean;
	fullWidth?: boolean;
}

interface Row {
	cells: [];
	id: string;
}

interface Cell {
	id: string;
	data: string;
}
