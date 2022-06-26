let uniqueColors = 0;
let frecuencyPixels = {};

const countUniquePixelsColor = () => {
  for(const data of arrayPixelData) {
    let strColor = JSON.stringify(data);
    frecuencyPixels[strColor] = {
      color: strColor,
      count: frecuencyPixels[strColor] ? frecuencyPixels[strColor].count + 1 : 1
    };
  }

  uniqueColors = Object.keys(frecuencyPixels).length;

  buildImageInfo({uniqueColors});

  console.log('Pixels founded');
  console.table(frecuencyPixels);
  console.table(imgInfo);

  printImageInfo();
  printUniquePixelsColor();
};

