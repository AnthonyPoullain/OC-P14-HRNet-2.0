/**
 * A component that renders a label and an input field.
 *
 * @param {string} props.label - The label of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string[]} props.options - The options of the input field, if its type === "select"
 */
function Field({ label, type, options, onChange }: InputField) {
	const id = label.trim().toLowerCase().replace(' ', '-');

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			{type === 'select' ? (
				<select name={id} aria-labelledby={id} id={id}>
					{options && options.length > 0
						? options.map((option) => (
							<option key={crypto.randomUUID()}>{option}</option>
						))
						: null}
				</select>
			) : (
				<input id={id} type={type} onChange={onChange} />
			)}
		</div>
	);
}

export default Field;
