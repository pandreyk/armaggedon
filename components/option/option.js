import styles from './option.module.scss';

export const Option = ({ title, value }) => (
  <div className={styles.option}>
    <span>{title}</span>
    <div className={styles.line}></div>
    <span>{value}</span>
  </div>
);
