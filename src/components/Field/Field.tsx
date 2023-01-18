/**
 * A component that renders a label and an input field.
 *
 * @param {string} props.label - The label of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string[]} props.options - The options of the input field, if its type === "select"
 * @param {string} props.value - The value of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {function} props.onChange - The onChange handler of the input field.
 */
function Field({ label, type, options, value, id, onChange }: InputField) {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			{type === 'select' ? (
				<select
					name={id}
					aria-labelledby={id}
					id={id}
					value={value}
					onChange={(e) => (onChange ? onChange(e) : null)}
				>
					{options
						? options.map((option) => (
							<option key={crypto.randomUUID()}>{option}</option>
						))
						: null}
				</select>
			) : (
				<input
					id={id}
					type={type}
					onChange={(e) => (onChange ? onChange(e) : null)}
					value={value}
				/>
			)}
		</div>
	);
}

export default Field;
