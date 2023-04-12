import { useEffect, useMemo, useState } from "react";
import styles from "./Characteristics.module.css";
import characteristicsMap from "../../misc/characteristicsMap";
import { objectKeys } from "../../misc/customFunctions/objectKeysTyped";
import CharacteristicsRow from "../CharacteristicsRow/CharacteristicsRow";
import { useSelector } from "react-redux";
import { selectSelectedDevices } from "../../app/reducers/reducer";

interface CharacteristicsProps {
	onlyDifferences: boolean,
}

const Characteristics = ({ onlyDifferences }: CharacteristicsProps) => {
	const selectedDevices = useSelector(selectSelectedDevices);
	const initialState = useMemo(() => new Map<string, boolean>(objectKeys(selectedDevices[0]).map(property => [property, true])), [selectedDevices])
	const [shouldDisplay, setShouldDisplay] = useState(initialState);
	useEffect(() => {
		const differences = new Map(initialState);
		if (onlyDifferences) {
			objectKeys(selectedDevices[0]).forEach((property) => {
				differences.set(property, !selectedDevices.every((device, index) => {
					if (index !== 0) {
						return device[property] === selectedDevices[0][property]
					} return true
				}))
			})
		}
		setShouldDisplay(differences);
	}, [selectedDevices, onlyDifferences, initialState])
	const content = useMemo(() => (
		objectKeys(selectedDevices[0]).filter((property) => (
			Boolean(characteristicsMap.get(property))
		)).map((property) => (
			shouldDisplay.get(property) ? <CharacteristicsRow key={property} selectedDevices={selectedDevices} property={property} /> : ""
		))
	), [selectedDevices, shouldDisplay])

	return (
		<div className={styles.content}>
			<div className={styles.list}>
				{content}
			</div>
		</div>
	)
}

export default Characteristics