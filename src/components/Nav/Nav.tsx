import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';

/**
 * Nav component
 */
function Nav() {
	const { pathname } = useLocation();
	const onHomePage = pathname === '/';
	const onEmployeeList = pathname === '/employee-list';

	return (
		<nav className={styles.nav}>
			<Link to="/">
				<h1 className={styles.logo}>
					HRnet
					<span>2.0</span>
				</h1>
			</Link>
			<div className={styles.links}>
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
