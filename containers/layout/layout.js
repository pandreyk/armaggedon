import Head from 'next/head';
import { Header } from './header';
import styles from './layout.module.scss';

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.layout}>
        <div className={styles.layout_container}>
          <Header />
          <main>{children}</main>
          <footer>2021 © Все права и планета защищены</footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
