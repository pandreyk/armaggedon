import { Layout } from '../containers/layout';
import { Listeroid } from '../containers/listeroid';
import { useAsteroids } from '../hooks/asteroids.hook';

function Home({ serverData }) {
  const { data, next, loader } = useAsteroids(serverData);

  return (
    <Layout title="Home">
      {data ? <Listeroid data={data} next={next} /> : loader}
    </Layout>
  );
}

Home.getInitialProps = async ({ req }) => {
  let serverData = null;

  if (req) {
    const { URL_NASA_NEO, API_KEY } = process.env;
    const dateFormatted = new Date().toISOString().slice(0, 10);

    serverData = await fetch(
      `${URL_NASA_NEO}/feed?start_date=${dateFormatted}&end_date=${dateFormatted}&api_key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((res) =>
        Object.values(res.near_earth_objects).reverse().flat(Infinity),
      );
  }

  return { serverData };
};

export default Home;
