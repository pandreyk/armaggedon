import { useRouter } from 'next/router';
import { Layout } from '../containers/layout';
import { useAsteroid } from '../hooks/asteroid.hook';
import { SelectedAsteroid } from '../containers/selectedAsteroid';

function Asteroid({ serverData }) {
  const router = useRouter();
  const { id } = router.query;
  const { asteroid, loader } = useAsteroid(serverData, id);

  return (
    <Layout title={asteroid?.name || 'Asteroid'}>
      {asteroid ? <SelectedAsteroid data={asteroid} /> : loader}
    </Layout>
  );
}

Asteroid.getInitialProps = async ({ req, query }) => {
  let serverData = null;

  if (req) {
    const { URL_NASA_NEO, API_KEY } = process.env;
    const { id } = query;

    serverData = await fetch(
      `${URL_NASA_NEO}/neo/${id}?api_key=${API_KEY}`,
    ).then((response) => response.json());
  }

  return { serverData };
};

export default Asteroid;
