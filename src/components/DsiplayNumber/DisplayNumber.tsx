import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from './DisplayNumber.module.css';
import { selectDeviceListLength, selectNumberOfDevices } from "../../app/reducers/reducer";
import { changeNumberOfDevices } from "../../app/actions/actions";
import { useDispatch } from "../../app/store";

const DisplayNumber = () => {
	const [selection, setSelection] = useState([false, false, false, false, false])
	const deviceListLength = useSelector(selectDeviceListLength);
	const numberOfDevices = useSelector(selectNumberOfDevices)
	useEffect(() => {
		const variants = [false, false, false, false, false];
		variants[numberOfDevices - 2] = true;
		setSelection(variants);
	}, [numberOfDevices])
	const dispatch = useDispatch()
	const amountVatiants = deviceListLength < 2 ? 2 : deviceListLength > 6 ? 6 : deviceListLength;
	const handleClick = useCallback((variant: number) => {
		dispatch(changeNumberOfDevices(variant))
	}, [dispatch])
	const content = useMemo(() => (
		[2, 3, 4, 5, 6].map((variant) => (
			amountVatiants >= variant ?
				<p className={selection[variant - 2] ? styles.active + ' ' + styles.variant : styles.variant}
					key={variant}
					onClick={() => handleClick(variant)} >{variant}
				</p> : ""
		))
	), [amountVatiants, handleClick, selection])

	return (
		<div className={styles.displayNumber}>
			<p>Отобразить товары: </p>
			{content}
		</div>
	)
}

export default DisplayNumber