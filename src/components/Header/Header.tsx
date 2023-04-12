import accountIcon from "../../assets/account.svg";
import styles from "./Header.module.css"


const Header = () => {
	return (
		<header className={styles.header}>
			<p className={styles.heading}>Каталог</p>
			<div className={styles.menu}>
				<p>СРАВНЕНИЕ</p>
				<a href="/#" className={styles.account}>
					<p>Личный кабинет</p>
					<img alt="" className={styles.accountIcon} src={accountIcon} />
				</a>
			</div>
		</header>
	)
}

export default Header