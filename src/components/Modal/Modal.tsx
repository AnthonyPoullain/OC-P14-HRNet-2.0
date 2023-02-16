import { ReactNode, useEffect, useState } from 'react';
import FocusTrap from 'focus-trap-react';
import './Modal.css';
import ConditionalPortalWrapper from '../ConditionalPortalWrapper/ConditionalPortalWrapper';

interface ButtonProperties {
	label: string | JSX.Element | ReactNode;
	variant?: 'secondary';
	onClick?: () => void;
	timer?: number;
}

interface ModalProperties {
	open: boolean;
	onClose: () => void | void;
	content: string | JSX.Element | ReactNode;
	title?: string | JSX.Element | ReactNode;
	buttons?:
	| []
	| [ButtonProperties]
	| [ButtonProperties, ButtonProperties]
	| JSX.Element
	| ReactNode;
	closable?: boolean;
	trapFocus?: boolean;
	portalSelector?: string;
	dimBackground?: boolean;
}

function ModalButton({ label, variant, onClick, timer }: ButtonProperties) {
	const [count, setCount] = useState(timer);

	useEffect(() => {
		if (count) {
			setInterval(() => {
				setCount((prevCount) => prevCount && prevCount - 1);
			}, 1000);
		}
	}, []);

	return (
		<button
			type="button"
			className={
				variant === 'secondary'
					? 'modal__btn modal__btn--secondary'
					: 'modal__btn'
			}
			onClick={onClick}
			disabled={!!count}
		>
			{label}
			{count ? ` (${count})` : ''}
		</button>
	);
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

	useEffect(() => {
		// Keyboard accessibility
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.code === 'Escape') onClose();
		};
		if (open) {
			document.addEventListener('keydown', handleKeydown);
		}
		return open
			? () => document.removeEventListener('keydown', handleKeydown)
			: () => null;
	}, [open]);

	return open ? (
		<ConditionalPortalWrapper selector={portalSelector}>
			<>
				{dimBackground ? <div id="modal-bg" className="modal__bg" /> : null}
				<FocusTrap active={open && trapFocus}>
					<div className="modal__container">
						<div id="modal" className="modal">
							{closable ? (
								<button
									data-testid="closeBtn"
									type="button"
									onClick={onClose}
									className="modal__close-btn"
								>
									<i className="fa-solid fa-circle-xmark" />
								</button>
							) : null}
							<div className="modal__header">
								{typeof title === 'string' ? (
									<h2 className="modal__title">{title}</h2>
								) : (
									title
								)}
							</div>
							<div className="modal__body">
								{typeof content === 'string' ? (
									<p className="modal__content">{content}</p>
								) : (
									content
								)}
							</div>
							<div className="modal__footer">
								{!buttons && <ModalButton label="Ok" onClick={onClose} />}
								{buttons && Array.isArray(buttons)
									? buttons.map((button: ButtonProperties) => (
										<ModalButton
											key={crypto.randomUUID()}
											label={button.label}
											variant={button.variant}
											onClick={
												button.onClick
													? () => onClickWrapper(button)
													: onClose
											}
											timer={button.timer}
										/>
									))
									: buttons}
							</div>
						</div>
					</div>
				</FocusTrap>
			</>
		</ConditionalPortalWrapper>
	) : null;
}

export default Modal;
