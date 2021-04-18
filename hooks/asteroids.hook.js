import { useEffect, useState, useRef } from 'react';

export const useAsteroids = (serverData) => {
  const [data, setData] = useState(serverData);

  const offsetDays = useRef(1);
  const startDate = new Date();

  const fetchAsteroids = ({ date }) => {
    const dateFormatted = date.toISOString().slice(0, 10);
    console.log('dateFormatted', dateFormatted);

    return fetch(
      `/api/asteroids?start_date=${dateFormatted}&end_date=${dateFormatted}`,
    )
      .then((response) => response.json())
      .then((res) =>
        Object.values(res.near_earth_objects).reverse().flat(Infinity),
      );
  };

  console.log('startDate', startDate);

  useEffect(async () => {
    if (!serverData) {
      const asteroids = await fetchAsteroids({
        date: startDate,
      });
      setData(asteroids);
    }
  }, []);

  const next = async () => {
    const newStartDate = new Date(
      startDate.setDate(new Date().getDate() + offsetDays.current),
    );

    const asteroids = await fetchAsteroids({
      date: newStartDate,
    });

    setData((prev) => [...prev, ...asteroids]);
    offsetDays.current++;
  };

  return { data, next, loader: <p>Loading...</p> };
};
