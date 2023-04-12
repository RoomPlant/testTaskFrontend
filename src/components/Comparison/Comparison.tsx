import { useState } from "react";
import StyledCheckBox from "../StyledCheckbox/StyledCheckbox";
import styles from "./Comparison.module.css";
import Characteristics from "../Characteristics/Characteristics";
import Devices from "../Devices/Devices";

const Comparison = () => {
	const [onlyDifferences, setOnlyDifferences] = useState(false);

	return (
		<div className={styles.content}>
			<div className={styles.devices}>
				<StyledCheckBox isChecked={onlyDifferences} setIsChecked={setOnlyDifferences} />
				<Devices />
			</div>
			<Characteristics onlyDifferences={onlyDifferences} />
		</div>
	)
}

export default Comparison;