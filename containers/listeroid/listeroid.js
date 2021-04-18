import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from './card';
import { Filter } from './filter';

export const Listeroid = ({ data, next, isDistruction = false }) => {
  const [onlyDangerous, setOnlyDangerous] = useState(false);
  const [distanceKm, setDistanceKm] = useState(true); // true - kilometres, false - lunar

  let selectedData = onlyDangerous
    ? data.filter((item) => item.is_potentially_hazardous_asteroid)
    : data;
  const [filteredData, setFilteredData] = useState(selectedData);

  useEffect(() => {
    const destroyedList = JSON.parse(localStorage.getItem('destroyedList'));
    const removedDestroyed = data.filter(
      (i) => i.id !== destroyedList?.filter((d) => d.id === i.id)[0]?.id,
    );

    setFilteredData(removedDestroyed);
  }, [data]);

  return (
    <>
      <Filter
        onlyDangerous={onlyDangerous}
        setOnlyDangerous={setOnlyDangerous}
        distanceKm={distanceKm}
        setDistanceKm={setDistanceKm}
      />

      {filteredData.length === 0 ? (
        <p>Опасных астероидов не обнаружено, планета в безопасности!</p>
      ) : isDistruction || onlyDangerous ? (
        <>
          {filteredData.map((item) => (
            <Card
              data={item}
              distanceKm={distanceKm}
              key={item.id}
              isDistruction={isDistruction}
            />
          ))}
          <p>Это все опасные астероиды. Уверен, Брюс справится!</p>
        </>
      ) : (
        <InfiniteScroll
          // className={styles.pepa}
          dataLength={filteredData.length}
          loader={<p>Loading...</p>}
          hasMore={true}
          next={next}>
          {filteredData.map((item) => (
            <Card data={item} distanceKm={distanceKm} key={item.id} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};
