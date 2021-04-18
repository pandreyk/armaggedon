const formatTriadWithUnit = (num, unit) => {
  return `${String(Math.round(num)).replace(
    /(\d)(?=(\d{3})+([^\d]|$))/g,
    '$1 ',
  )} ${unit}`;
};

export default formatTriadWithUnit;
