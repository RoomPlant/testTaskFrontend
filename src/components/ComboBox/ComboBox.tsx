import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import styles from "./ComboBox.module.css";
import { selectSearchedDevices, selectSelectedDevices } from "../../app/reducers/reducer";
import { useDispatch } from "../../app/store";
import { search, selectDevice, updateSearchedDevices } from "../../app/actions/actions";

interface ComboBoxProps {
	index: number,
	closeFunction: () => void
}

const ComboBox = ({ index, closeFunction }: ComboBoxProps) => {
	const [value, setValue] = useState('');
	const searchedDevices = useSelector(selectSearchedDevices);
	const selectedDevices = useSelector(selectSelectedDevices);
	const dispatch = useDispatch();
	const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		dispatch(search(event.target.value));
	}, [dispatch])
	const handleClick = useCallback((index: number, searchIndex: number) => {
		dispatch(selectDevice(index, searchIndex));
		closeFunction()
	}, [closeFunction, dispatch])
	useEffect(() => {
		dispatch(updateSearchedDevices());
	}, [selectedDevices, dispatch])

	return (
		<div className={styles.comboBox}>
			<input value={value} onChange={handleInput} className={styles.searchBar} placeholder="Поиск" />
			{searchedDevices.map((device, searchIndex) => (
				<div key={device.uid} className={styles.device}>
					<button onClick={() => handleClick(index, searchIndex)} className={styles.button} />
					<img className={styles.image} src={device.image} alt="" />
					<p>{device.fullName}</p>
				</div>
			))}
		</div>
	)
}

export default ComboBox