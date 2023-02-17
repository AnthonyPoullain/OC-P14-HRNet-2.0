import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav/Nav';

/**
 * Layout component
 */
function Layout() {
	return (
		<div id="app">
			<Nav />
			<main>
				<Suspense>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
}

export default Layout;
