import characteristicsMap from "../../misc/characteristicsMap";
import { Device } from "../../misc/stateInterface";
import included from "../../assets/included.svg"
import notIncluded from "../../assets/notIncluded.svg"
import styles from "./CharacteristicsRow.module.css";
import { useMemo } from "react";

interface CharacteristicsRowProps {
	selectedDevices: Device[],
	property: keyof Device
}

const CharacteristicsRow = ({ selectedDevices, property }: CharacteristicsRowProps) => {
	const content = useMemo(() => (
		selectedDevices.map((device) => (
			<p key={device.uid} className={styles.item}>
				{typeof device[property] === 'boolean' ?
					device[property] ? <img alt="" src={included} /> : <img alt="" src={notIncluded} /> :
					device[property]
				}
			</p>))
	), [property, selectedDevices])

	return (
		<div className={styles.row}>
			<p className={styles.item + ' ' + styles.name}>{characteristicsMap.get(property)}</p>
			{content}
		</div>
	)
}

export default CharacteristicsRow;