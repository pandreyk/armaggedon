import { CheckBox } from '../../../components/checkbox';
import styles from './filter.module.scss';

export const Filter = ({
  onlyDangerous,
  setOnlyDangerous,
  distanceKm,
  setDistanceKm,
}) => {
  const handleClickCheckBox = () => {
    setOnlyDangerous(!onlyDangerous);
  };

  const handleClickDistance = (flag) => {
    setDistanceKm(flag);
  };

  return (
    <div className={styles.filter}>
      <CheckBox checked={onlyDangerous} onClick={handleClickCheckBox}>
        Показать только опасные
      </CheckBox>

      <div className={styles.distance}>
        Расстояние&nbsp;
        <span
          className={distanceKm && styles.selected}
          onClick={() => handleClickDistance(true)}>
          в километрах,
        </span>
        &nbsp;
        <span
          className={!distanceKm && styles.selected}
          onClick={() => handleClickDistance(false)}>
          в дистанциях до луны
        </span>
      </div>
    </div>
  );
};
