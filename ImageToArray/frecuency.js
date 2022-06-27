let uniqueColors = 0;
let frecuencyPixels = {};
let probability = {};
let valueHdRho = 0;

const countUniquePixelsColor = () => {
  for(const data of arrayPixelData) {
    let strColor = JSON.stringify(data);
    frecuencyPixels[strColor] = {
      color: strColor,
      count: frecuencyPixels[strColor] ? frecuencyPixels[strColor].count + 1 : 1,
      probability: frecuencyPixels[strColor] ? ((frecuencyPixels[strColor].count + 1) / lengthPixelData) : (1/lengthPixelData),
      amountInfo: frecuencyPixels[strColor] ? (Math.log2(1/((frecuencyPixels[strColor].count + 1) / lengthPixelData))) : (Math.log2(1/(1/lengthPixelData)))
    };
  }

  uniqueColors = Object.keys(frecuencyPixels).length;

  buildImageInfo({uniqueColors});
  printImageInfo();
  printUniquePixelsColor();
  setHdRho();
};

const setHdRho = () => { 
  Object.values(frecuencyPixels).forEach(symbol => {
    valueHdRho += (symbol.amountInfo * symbol.probability);
  });
  inputHdRho.value = `${valueHdRho} bits`;
};

const getChannelCapacity = () => {
  let valueChannel = parseFloat(inputChannel.value);
  infoTheorem.innerHTML = (valueHdRho <= valueChannel) ? 'Cumple el Teorema' : 'No se cumple el Teorema';
  window.scrollTo(0, document.body.scrollHeight);
};
