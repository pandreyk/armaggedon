export default async function (req, res) {
  const { URL_NASA_NEO, API_KEY } = process.env;
  const { start_date, end_date } = req.query;

  await fetch(
    `${URL_NASA_NEO}/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((json) => res.status(200).json(json))
    .catch((e) => res.status(500).json({ error: e.message }));
}
