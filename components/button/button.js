import styles from './button.module.scss';

export const Button = ({ title, disabled, onClick }) => {
  const noop = (e) => {
    e.preventDefault();
    console.log('noop');
  };

  return (
    <div
      className={`${styles.button} ${disabled && styles.disabled}`}
      onClick={disabled ? noop : onClick}>
      <span>{title}</span>
    </div>
  );
};
