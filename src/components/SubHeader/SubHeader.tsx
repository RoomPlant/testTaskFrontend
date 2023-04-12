import styles from "./SubHeader.module.css"
import DisplayNumber from "../DsiplayNumber/DisplayNumber";


const SubHeader = () => {
	return (
		<div className={styles.subHeader}>
			<h1 className={styles.heading}>Смартфоны</h1>
			<DisplayNumber />
		</div>
	)
}

export default SubHeader