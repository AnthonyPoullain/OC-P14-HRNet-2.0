import React from 'react';

/**
 * A component that renders a label and an input field.
 *
 * @param {string} props.label - The label of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string[]} props.options - The options of the input field, if its type === "select"
 * @param {string} props.value - The value of the input field.
 * @param {string} props.id - The id of the input field.
 * @param {function} props.onChange - The onChange handler of the input field.
 * @param {function} props.onBlur - The onBlur handler of the input field.
 * @param {boolean} props.error - Whether the input field has an error.
 * @param {string} props.errorMessage - The error message of the input field, if it has an error.
 */
function Field({
	label,
	type,
	options,
	value,
	id,
	onChange,
	error,
	errorMessage,
}: InputField) {
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			{type === 'select' ? (
				<select
					className={error ? 'error' : ''}
					name={id}
					aria-labelledby={id}
					id={id}
					value={value}
					onChange={onChange}
				>
					{options
						? options.map((option) => (
							<option key={crypto.randomUUID()}>{option}</option>
						))
						: null}
				</select>
			) : (
				<input
					className={error ? 'error' : ''}
					id={id}
					name={id}
					type={type}
					onChange={onChange}
					value={value}
				/>
			)}
			<span className="error-message">{error ? errorMessage : ''}</span>
		</div>
	);
}

export default React.memo(Field);
