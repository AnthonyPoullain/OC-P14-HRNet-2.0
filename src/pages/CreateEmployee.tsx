import Field from '../components/Field/Field';

interface Input {
	label: string;
	type: string;
	options?: string[];
}

function CreateEmployee() {
	const INPUTS: Input[][] = [
		[
			{ label: 'First Name', type: 'text' },
			{ label: 'Last Name', type: 'text' },
			{ label: 'Date of Birth', type: 'text' },
			{ label: 'Start Date', type: 'text' },
		],
		[
			{ label: 'Street', type: 'text' },
			{ label: 'City', type: 'text' },
			{ label: 'State', type: 'select' },
			{ label: 'Zip Code', type: 'text' },
		],
		[
			{
				label: 'Department',
				type: 'select',
				options: [
					'Sales',
					'Marketing',
					'Engineering',
					'Human Ressources',
					'Legal',
				],
			},
		],
	];

	return (
		<div className="container">
			<h2>Create Employee</h2>
			<form action="#" id="create-employee">
				{INPUTS[0].map((input) => (
					<Field
						label={input.label}
						type={input.type}
						key={crypto.randomUUID()}
					/>
				))}
				<fieldset className="address">
					<legend>Address</legend>

					{INPUTS[1].map((input) => (
						<Field
							label={input.label}
							type={input.type}
							key={crypto.randomUUID()}
						/>
					))}
				</fieldset>
				{INPUTS[2].map((input) => (
					<Field
						label={input.label}
						type={input.type}
						options={input.options}
						key={crypto.randomUUID()}
					/>
				))}
			</form>
			<button type="submit">Save</button>
		</div>
	);
}

export default CreateEmployee;
