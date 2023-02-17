import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';

const CreateEmployee = lazy(
	() => import('./pages/CreateEmployee/CreateEmployee')
);
const EmployeeList = lazy(() => import('./pages/EmployeeList/EmployeeList'));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<CreateEmployee />} />
					<Route path="employee-list" element={<EmployeeList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
