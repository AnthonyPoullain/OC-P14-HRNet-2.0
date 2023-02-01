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

	return open ? (
		<>
			<div className={styles['modal-bg']} />
			<div className={styles['close-btn']}>X</div>
			<div className={styles.modal}>
				<h2>{title}</h2>
				<p>{message}</p>
				{buttons ? (
					buttons.map((button) => (
						<button
							key={crypto.randomUUID()}
							type="button"
							className="btn"
							onClick={button.onClick || onClose}
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
		</>
	) : null;
}

export default Modal;
