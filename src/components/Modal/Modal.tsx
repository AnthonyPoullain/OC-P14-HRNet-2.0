import ReactDOM from 'react-dom';

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
	const MODAL: React.CSSProperties = {
		minWidth: '400px',
		minHeight: '150px',
		position: 'fixed',
		textAlign: 'center',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#fff',
		borderRadius: '5px',
		padding: '20px 40px',
		width: 'fit-content',
		boxShadow: '0px 0px 10px -10px var(--grey-400)',
		zIndex: 1001,
	};

	const MODAL_BG: React.CSSProperties = {
		zIndex: 1000,
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		background: 'rgba(0,0,0,.2)',
	};

	return ReactDOM.createPortal(
		<>
			<div style={MODAL_BG} />
			<div style={MODAL}>
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
