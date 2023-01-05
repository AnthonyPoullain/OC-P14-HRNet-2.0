import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import CreateEmployee from './pages/CreateEmployee';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<CreateEmployee />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
