import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';

import { useDispatch } from './app/store';
import { fetchDevices } from "./app/actions/thunkActions";
import { selectDeviceListLength, selectIsLoading } from './app/reducers/reducer';
import ComparisonPage from './pages/CoparisonPage';


function App() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading)
	const deviceListLength = useSelector(selectDeviceListLength)
	useEffect(() => {
		dispatch(fetchDevices())
	}, [dispatch])

	return (
		<div className="App">
			<Header />
			{
				isLoading || !deviceListLength ?
					"ЗАГРУЗКА" :
					<ComparisonPage />
			}
		</div>
	);
}

export default App;
