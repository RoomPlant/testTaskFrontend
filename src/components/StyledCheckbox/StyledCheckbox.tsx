import { useCallback } from "react"
import styles from "./StyledCheckBox.module.css"

interface StyledCheckBoxProps {
	isChecked: boolean,
	setIsChecked: Function
}

const StyledCheckBox = ({ setIsChecked, isChecked }: StyledCheckBoxProps) => {
	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setIsChecked(event.target.checked), [setIsChecked])

	return (
		<label className={styles.label}>Показать различия
			<input checked={isChecked} onChange={handleChange} className={styles.checkbox} type="checkbox" />
			<span className={styles.checkmark} />
		</label>
	)
}

export default StyledCheckBox