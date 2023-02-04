import { ReactNode } from 'react';
import styles from './Modal.module.css';

interface ButtonProperties {
	label: string | ReactNode;
	variant?: 'primary' | 'secondary';
	onClick?: () => void;
	disabled?: boolean;
	fullWidth?: boolean;
}

interface ModalProperties {
	title: string;
	message: string;
	buttons?: [ButtonProperties] | [ButtonProperties, ButtonProperties];
	open: boolean;
	onClose: () => void | void;
}

function Modal({
	title,
	message,
	buttons,
	open = true,
	onClose,
}: ModalProperties) {
	const defaultBtn: ButtonProperties = {
		label: 'Ok',
		variant: 'primary',
	};

	const onClickWrapper = (button: ButtonProperties) => {
		if (button.onClick) button.onClick();
		if (onClose) onClose();
	};

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			onClose();
		}
	});

	return open ? (
		<>
			<div className={styles['modal-bg']} />
			{/* <div className={styles['close-btn']}>X</div> */}
			<div className={styles.modal}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.message}>{message}</p>
				<div className={styles.buttons}>
					{buttons ? (
						buttons.map((button) => (
							<button
								key={crypto.randomUUID()}
								type="button"
								className={
									button.variant === 'secondary' ? 'btn btn-secondary' : 'btn'
								}
								onClick={
									button.onClick ? () => onClickWrapper(button) : onClose
								}
							>
								{button.label}
							</button>
						))
					) : (
						<button autoFocus type="button" className="btn" onClick={onClose}>
							{defaultBtn.label}
						</button>
					)}
				</div>
			</div>
		</>
	) : null;
}

export default Modal;
