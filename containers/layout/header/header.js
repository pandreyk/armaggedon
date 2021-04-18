import { Navbar } from './navbar';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.info}>
          <span className={styles.title}>ARMAGGEDON V</span>
          <span className={styles.description}>
            Сервис мониторинга и уничтожения астероидов, опасно подлетающих
            к Земле.
          </span>
        </div>
        <Navbar />
      </div>
      <div className={styles.line} />
    </header>
  );
};

export default Header;
