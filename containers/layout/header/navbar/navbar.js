import Link from '../../../../components/link';
import styles from './navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" activeClassName={styles.active}>
          <a>Астероиды</a>
        </Link>
      </div>

      <div>
        <Link href="/destruction" activeClassName={styles.active}>
          <a>Уничтожение</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
