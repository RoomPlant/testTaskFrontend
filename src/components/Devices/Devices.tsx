import { useSelector } from "react-redux"
import { useCallback, useMemo, useRef, useState } from "react";
import styles from "./Devices.module.css"
import { selectSelectedDevices } from "../../app/reducers/reducer"
import { selectDeviceListLength } from "../../app/reducers/reducer";
import ComboBox from "../ComboBox/ComboBox";
import useOutsideClick from "../../misc/customHooks/useClickOutside";

const Devices = () => {
	const buttonsRef = useRef<(HTMLDivElement | null)[]>([])
	const deviceListLength = useSelector(selectDeviceListLength);
	const selectedDevices = useSelector(selectSelectedDevices);
	const initialState = useMemo(() => selectedDevices.map(() => false), [selectedDevices]);
	const [shouldDisplay, setShouldDisplay] = useState(initialState);
	const handleClick = useCallback((index: number) => {
		const change = [...initialState];
		change[index] = true
		setShouldDisplay(change)
	}, [initialState])
	useOutsideClick(buttonsRef, () => {
		setShouldDisplay(initialState)
	});

	return (
		<div className={styles.list}>
			{
				selectedDevices.map((device, index) => (
					<div key={device.uid} className={styles.device}>
						<div className={styles.topPart}>
							<img className={styles.image} alt="" src={device.image} />
							{deviceListLength > selectedDevices.length ?
								<div ref={ref => buttonsRef.current[index] = ref}>
									<button className={styles.button} onClick={() => handleClick(index)} />
									{shouldDisplay[index] ? <ComboBox index={index} closeFunction={() => setShouldDisplay(initialState)} /> : ""}
								</div> : ""}
						</div>
						<p className={styles.deviceName}>{device.fullName}</p>
					</div>
				))
			}
		</div>
	)
}

export default Devices