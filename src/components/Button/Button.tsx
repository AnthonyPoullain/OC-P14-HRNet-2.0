import styles from './Button.module.css';

function Button({
	variant = 'primary',
	type = 'button',
	disabled = false,
	fullWidth = false,
	onClick,
	children,
}: Btn) {
	return (
		<button
			style={fullWidth ? { width: '100%' } : {}}
			disabled={disabled}
			onClick={onClick}
			className={
				variant === 'secondary'
					? `${styles.btn} ${styles.btnSecondary}`
					: `${styles.btn}`
			}
			type={type === 'submit' ? 'submit' : 'button'}
		>
			{children}
		</button>
	);
}

export default Button;
