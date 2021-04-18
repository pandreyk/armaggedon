const nameFormatter = (name) => {
  const formattedName =
    name.slice(0, 1) === '(' && name.slice(-1) === ')'
      ? name.slice(1, -1)
      : name;

  return formattedName;
};

export default nameFormatter;
