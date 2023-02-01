import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import EmployeeList from './pages/EmployeeList/EmployeeList';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<CreateEmployee />} />
				</Route>
				<Route path="/employee-list" element={<Layout />}>
					<Route index element={<EmployeeList />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
