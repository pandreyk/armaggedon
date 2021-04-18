import formatTriadWithUnit from './formatTriadWithUnit';

const distanceFormatter = (distances) => {
  let km = formatTriadWithUnit(distances.kilometers, 'км');
  let lunar = formatTriadWithUnit(distances.lunar, 'рс. до луны');

  return { km, lunar };
};

export default distanceFormatter;
