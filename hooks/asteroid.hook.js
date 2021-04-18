import { useEffect, useState } from 'react';

export const useAsteroid = (serverData, id) => {
  const [data, setData] = useState(serverData);

  useEffect(async () => {
    if (!serverData) {
      const asteroid = await fetch(`/api/asteroid?id=${id}`).then((response) =>
        response.json(),
      );

      console.log('asteroid', asteroid);
      setData(asteroid);
    }
  }, []);

  return { asteroid: data, loader: <p>Loading...</p> };
};
