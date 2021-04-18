import { useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from '../../components/option';
import { DestructionButton } from '../destructionButton';
import { InputList } from '../../components/inputList';
import { Asteroid, Dino } from '../../components/svg';
import getSizeAndOffsetAsteroid from '../../utils/getSizeAndOffsetAsteroid';
import distanceFormatter from '../../utils/distanceFormatter';
import nameFormatter from '../../utils/nameFormatter';
import dateFormatter from '../../utils/dateFormatter';
import styles from './selectedAsteroid.module.scss';

export const SelectedAsteroid = ({ data }) => {
  const router = useRouter();
  const { date } = router.query;

  const [inputValue, setInputValue] = useState(date);
  const [selectedApproachData, setSelectedApproachData] = useState(
    data?.close_approach_data.filter(
      (i) => i.close_approach_date === date,
    )[0] || data?.close_approach_data[0],
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    const buf = data.close_approach_data.filter(
      (i) => i.close_approach_date === e.target.value,
    )[0];

    if (typeof buf !== 'undefined') {
      setSelectedApproachData(buf);
    }
  };

  const rangeDiameters = {
    min: data.estimated_diameter.meters.estimated_diameter_min,
    max: data.estimated_diameter.meters.estimated_diameter_max,
  };

  const { size } = getSizeAndOffsetAsteroid(rangeDiameters);
  const { km, lunar } = distanceFormatter(selectedApproachData.miss_distance);
  const formattedDate = dateFormatter(selectedApproachData.close_approach_date);
  const name = nameFormatter(data.name);
  const isDangerous = data?.is_potentially_hazardous_asteroid;

  return (
    <div>
      <div>
        <div className={styles.asteroid}>
          <div className={styles.info}>
            <div className={styles.name}>{name}</div>

            <InputList
              title="Выберите дату"
              data={data.close_approach_data}
              selectedKey="close_approach_date"
              value={inputValue}
              onChange={handleInputChange}
            />

            <Option title="Дата" value={formattedDate} />
            <Option title="Расстояние" value={km} />
            <Option title="Расстояние" value={lunar} />
            <Option title="Размер" value={size} />

            <a href={data.nasa_jpl_url} target="_blanc">
              Узнать подробнее
            </a>
          </div>

          <div className={styles.asteroidImage}>
            <Asteroid />
          </div>

          <div className={styles.dino}>
            <Dino />
          </div>
        </div>
      </div>

      <div className={`${styles.verdict} ${isDangerous && styles.danger}`}>
        <div className={styles.grade}>
          Оценка: <br />
          <span>{isDangerous ? 'опасен' : 'не опасен'}</span>
        </div>
        <DestructionButton data={data} />
      </div>
    </div>
  );
};
