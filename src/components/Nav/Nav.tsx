import { Link, useLocation } from 'react-router-dom';

/**
 * Nav component
 */
function Nav() {
	const { pathname } = useLocation();
	const onHomePage = pathname === '/';
	const onEmployeeList = pathname === '/employee-list';

	return (
		<nav
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '0 clamp(10px,5vw,60px) 0 clamp(10px,5vw,60px)',
				position: 'fixed',
				zIndex: 1000,
				width: '100vw',
				/* background: */
				/* 	'linear-gradient(90deg, rgba(94,83,171,1) 0%, rgba(139,87,139,1) 100%)', */
				backgroundColor: '#fff',
				boxShadow: '-1px -5px 10px 2px var(--grey-400)',
			}}
		>
			<Link to="/">
				<h1
					style={{
						fontWeight: '700',
						fontSize: '24',
					}}
				>
					HRnet
					<span
						style={{
							color: 'var(--primary-color)',
							fontWeight: '500',
							fontSize: '14px',
						}}
					>
						2.0
					</span>
				</h1>
			</Link>
			<div
				style={{
					fontWeight: 'bold',
					color: 'var(--grey-400)',
				}}
			>
				<Link
					style={{ opacity: onHomePage ? '100%' : '66%' }}
					className={onHomePage ? 'btn' : ''}
					to="/"
				>
					Create an employee
				</Link>
				<Link
					style={{ opacity: onEmployeeList ? '100%' : '66%' }}
					className={onEmployeeList ? 'btn' : ''}
					to="/employee-list"
				>
					List of employees
				</Link>
			</div>
		</nav>
	);
}

export default Nav;
