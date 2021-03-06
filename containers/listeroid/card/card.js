import { useState } from 'react';
import Link from 'next/link';
import { DestructionButton } from '../../destructionButton';
import { Option } from '../../../components/option';
import { Asteroid, Dino } from '../../../components/svg';
import getSizeAndOffsetAsteroid from '../../../utils/getSizeAndOffsetAsteroid';
import distanceFormatter from '../../../utils/distanceFormatter';
import dateFormatter from '../../../utils/dateFormatter';
import nameFormatter from '../../../utils/nameFormatter';
import styles from './card.module.scss';

export const Card = ({ data, distanceKm, isDistruction = false }) => {
  const [removed, setRemoved] = useState(false);

  const rangeDiameters = {
    min: data.estimated_diameter.meters.estimated_diameter_min,
    max: data.estimated_diameter.meters.estimated_diameter_max,
  };

  const {
    size,
    widthAsteroidSvg,
    heightAsteroidSvg,
    bottomOffset,
    leftOffset,
  } = getSizeAndOffsetAsteroid(rangeDiameters);
  const { km, lunar } = distanceFormatter(
    data.close_approach_data[0].miss_distance,
  );
  const date = dateFormatter(data.close_approach_data[0].close_approach_date);
  const name = nameFormatter(data.name);
  const isDangerous = data?.is_potentially_hazardous_asteroid;

  return (
    !removed && (
      <Link
        href={`/asteroid?id=${data.id}&date=${data.close_approach_data[0].close_approach_date}`}>
        <a>
          <div className={`${styles.card} ${isDangerous && styles.danger}`}>
            <div className={`${styles.images} ${isDangerous && styles.danger}`}>
              <div className={styles.asteroid}>
                <div style={{ bottom: bottomOffset, left: leftOffset }}>
                  <Asteroid
                    width={widthAsteroidSvg}
                    height={heightAsteroidSvg}
                  />
                </div>
              </div>
              <div className={styles.dino}>
                <Dino />
              </div>
            </div>

            <div className={styles.info}>
              <div>
                <div className={styles.name}>{name}</div>
                <Option title="????????" value={date} />
                <Option title="????????????????????" value={distanceKm ? km : lunar} />
                <Option title="????????????" value={size} />
              </div>
            </div>

            <div className={styles.verdict}>
              <div className={styles.grade}>
                ????????????: <br />
                <span>{isDangerous ? '????????????' : '???? ????????????'}</span>
              </div>
              <div className={styles.button}>
                <DestructionButton
                  data={data}
                  isDistruction={isDistruction}
                  setRemoved={setRemoved}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    )
  );
};
