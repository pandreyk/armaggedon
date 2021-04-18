import formatTriadWithUnit from './formatTriadWithUnit';

const getSizeAndOffsetAsteroid = (rangeDiameters) => {
  // В данных приходит минимальный и максимальный диаметр.
  // Я решил брать среднее значение
  let size = (rangeDiameters.min + rangeDiameters.max) / 2;

  // Средние значение на которые нужно делить размер астероида
  // в метрах для полученя высоты и ширины в пикселях для svg.
  // Получил эти значения исходя и размеров астероида и размеров картинки
  // в макете. Было три примера соотношений этих данных, я взял среднее значение.
  const meanWidth = 1.41;
  const meanHeight = 1.389;

  const widthAsteroidSvg = size / meanWidth;
  const heightAsteroidSvg = size / meanHeight;

  // Чем больше астероид, тем меньше он помещается на экран,
  // поэтому по мере его увеления нужно опускать изображение ниже.
  let bottomOffset = 0;

  if (size < 1200) {
    const meanOffset =
      size > 1050
        ? 2
        : size > 900
        ? 3
        : size > 700
        ? 4
        : size > 500
        ? 6
        : size > 400
        ? 8
        : size > 300
        ? 10
        : size < 10
        ? null
        : size < 15
        ? 400
        : size < 20
        ? 330
        : size < 30
        ? 170
        : size < 40
        ? 130
        : size < 50
        ? 110
        : size < 65
        ? 90
        : null;
    bottomOffset = meanOffset ? `${(size * meanOffset) / 1000}rem` : '4rem';
  }

  // В мобильной версии астероид сильно прикреплен к левому краю,
  // чтобы это исправить устнанавливаем отсупы. В css для не(!) мобильной
  // версии устанавливаем left: auto !important.
  let leftOffset = 'auto';
  if (size < 1000) {
    leftOffset =
      size > 900
        ? '-11rem'
        : size > 800
        ? '-9rem'
        : size > 700
        ? '-8rem'
        : size > 600
        ? '-6rem'
        : size > 500
        ? '-4.5rem'
        : size > 400
        ? '-2.5rem'
        : size > 300
        ? '0rem'
        : size > 200
        ? '1rem'
        : size > 100
        ? '2.5rem'
        : '3.5rem';
  }

  size = formatTriadWithUnit(size, 'м');

  return {
    size,
    widthAsteroidSvg,
    heightAsteroidSvg,
    bottomOffset,
    leftOffset,
  };
};

export default getSizeAndOffsetAsteroid;
