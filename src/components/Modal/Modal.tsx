import { ReactNode } from 'react';
import FocusTrap from 'focus-trap-react';
import styles from './Modal.module.css';
import ConditionalPortalWrapper from '../ConditionalPortalWrapper/ConditionalPortalWrapper';

interface ButtonProperties {
	label: string | ReactNode;
	variant?: 'primary' | 'secondary';
	onClick?: () => void;
	disabled?: boolean;
	fullWidth?: boolean;
}

interface ModalProperties {
	open: boolean;
	onClose: () => void | void;
	content: string | JSX.Element | ReactNode;
	title?: string;
	buttons?: [] | [ButtonProperties] | [ButtonProperties, ButtonProperties];
	closable?: boolean;
	trapFocus?: boolean;
	portalSelector?: string;
	dimBackground?: boolean;
}

function Modal({
	title,
	content,
	buttons,
	open = true,
	closable,
	onClose,
	trapFocus = true,
	portalSelector,
	dimBackground = true,
}: ModalProperties) {
	/**
	 * Wrapper for button onClick.
	 * Ensure that the modal is closed after onClick callback is called.
	 *
	 * @param {ButtonProperties} button
	 */
	function onClickWrapper(button: ButtonProperties) {
		if (button.onClick) button.onClick();
		if (onClose) onClose();
	}

	// Keyboard accessibility
	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			onClose();
		}
	});

	const hasAtLeastOneButton = !(buttons?.length === 0 && !closable);

	return open ? (
		<ConditionalPortalWrapper selector={portalSelector}>
			<>
				{dimBackground ? (
					<div id="modal-bg" className={styles['modal-bg']} />
				) : null}
				<FocusTrap active={open && trapFocus && hasAtLeastOneButton}>
					<div className={styles.modal} id="modal">
						{closable ? (
							<button
								data-testid="closeBtn"
								type="button"
								onClick={onClose}
								className={styles['close-btn']}
							>
								<i className="fa-solid fa-circle-xmark" />
							</button>
						) : null}
						<h2 className={styles.title}>{title}</h2>
						{typeof content === 'string' ? (
							<p className={styles.content}>{content}</p>
						) : (
							content
						)}
						<div className={styles.buttons}>
							{buttons ? (
								buttons.map((button) => (
									<button
										key={crypto.randomUUID()}
										type="button"
										className={
											button.variant === 'secondary'
												? 'btn btn-secondary'
												: 'btn'
										}
										onClick={
											button.onClick ? () => onClickWrapper(button) : onClose
										}
									>
										{button.label}
									</button>
								))
							) : (
								<button type="button" className="btn" onClick={onClose}>
									Ok
								</button>
							)}
						</div>
					</div>
				</FocusTrap>
			</>
		</ConditionalPortalWrapper>
	) : null;
}

export default Modal;
