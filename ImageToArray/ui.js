const printUniquePixelsColor = () => {
  Object.entries(frecuencyPixels).forEach(pixel => {
    buildTable(pixel[1], printColor(`${pixel[0]}`));
  });
};

const printColor = (colorStr) => {
  const rgbaArr = JSON.parse(colorStr);
  const colorFrame = document.createElement('div');

  colorFrame.style.width = '20px';
  colorFrame.style.height = '20px';
  colorFrame.style.backgroundColor = `rgba(${[...rgbaArr]})`;
  colorFrame.style.border = '1px solid gray';

  return colorFrame;
};

const printImageInfo = () => {
  const title = document.createElement('span');
  
  title.innerText = 'Image info';
  buildTable(imgInfo, title);
};
