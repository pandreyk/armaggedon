import { BiCheckbox, BiCheckboxSquare } from 'react-icons/bi';
import styles from './checkbox.module.scss';

export const CheckBox = ({ checked, onClick, children }) => (
  <span className={styles.checkbox} onClick={onClick}>
    <div className={styles.icon}>
      {checked ? <BiCheckboxSquare /> : <BiCheckbox />}
    </div>
    <label>{children}</label>
  </span>
);
