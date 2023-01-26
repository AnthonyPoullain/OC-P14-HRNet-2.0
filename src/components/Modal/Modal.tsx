import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

function Modal({
	title,
	message,
	buttonText,
	onClick,
}: {
	title: string;
	message: string;
	buttonText: string;
	onClick: () => void | void;
}) {
	return ReactDOM.createPortal(
		<>
			<div className={styles.modal_bg} />
			<div className={styles.modal}>
				<h2>{title}</h2>
				<p>{message}</p>
				<button autoFocus type="button" className="btn" onClick={onClick}>
					{buttonText}
				</button>
			</div>
		</>,
		document.getElementById('portal') as Element
	);
}

export default Modal;
