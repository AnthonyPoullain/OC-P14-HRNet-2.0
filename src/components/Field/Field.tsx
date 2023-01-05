/**
 * A component that renders a label and an input field.
 *
 * @param {string} props.label - The label of the input field.
 * @param {string} props.type - The type of the input field.
 */
function Field({
	label,
	type,
	options,
}: {
	label: string;
	type: string;
	options?: string[];
}) {
	const id = label.trim().toLowerCase().replace(' ', '-');

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			{type === 'select' ? (
				<select name={id} aria-labelledby={id} id={id}>
					{options &&
						options.map((option) => (
							<option key={crypto.randomUUID()}>{option}</option>
						))}
				</select>
			) : (
				<input id={id} type={type} />
			)}
		</div>
	);
}

Field.defaultProps = { options: [''] };

export default Field;
