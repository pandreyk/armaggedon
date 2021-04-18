const dateFormatter = (date) => {
  // // современное решение
  // const formattedDate = new Date(date)
  //   .toLocaleString('ru', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   })
  //   .slice(0, -3);

  // решение для всех браузеров
  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  const res = date.split('-');
  const day = res[2][0] === '0' ? res[2][1] : res[2];
  const month = months[res[1] - 1];
  const year = res[0];

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};

export default dateFormatter;
