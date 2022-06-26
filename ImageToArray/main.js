// ------- Variables -------

let fileValue;
let img, imgFile;
let imgInfo = {};
let originalCanvas, originalContext;
let arrayData = [];
let arrayPixelData = [];
let loading;

// ------- Functions -------

const getElementsDOM = () => {
  fileValue = document.getElementById('inputFileImage');
  originalCanvas = document.getElementById('originalCanvas');
  loading = document.getElementById('gifLoading');

  originalContext = originalCanvas.getContext('2d');
};

const clearVariables = () => {
  img = '';
  imgFile = '';
  originalContext.restore();
  arrayData = [];
  arrayPixelData = [];
};

const onImageChange = (e) => {
  clearVariables();
  let newImage = e.target.files[0];
  buildImageInfo({
    'name': newImage.name,
    'type': newImage.type,
    'sizeBytes': newImage.size,
  });
  imgFile = URL.createObjectURL(newImage);
  createImage(imgFile, printOriginalImage);
  processing(() => {
    getArrayImage();
    countUniquePixelsColor();
  });
};

const createImage = (imgFile, callback) => {
  img = document.createElement('img');
  img.onload = () => callback(img);
  img.setAttribute('src', imgFile);
};

const buildImageInfo = (property) => {
  imgInfo = {
    ...imgInfo,
    ...property
  };
};

const printOriginalImage = () => {
  buildImageInfo({
    'width': img.width,
    'height': img.height,
    'pixels': (4 * img.width * img.width)
  });
  originalCanvas.width = img.width;
  originalCanvas.height = img.height;
  originalContext.drawImage(img, 0, 0, img.width, img.height);
};

const getArrayImage = () => {
  for(let y = 0; y < originalCanvas.height; y++) {
    for(let x = 0; x < originalCanvas.width; x++) {
      let pixelData = originalContext.getImageData(x, y, 1, 1).data;
      arrayData.push(pixelData[0]); // red
      arrayData.push(pixelData[1]); // green
      arrayData.push(pixelData[2]); // blue
      arrayData.push(pixelData[3]); // alpha
      // if(x < 1 && y < 1) {
      //   console.table(pixelData);
      // }
    }
  }
  getArrayPixelsColorsOfImage(arrayData);
};

const getArrayPixelsColorsOfImage = (arrayData) => {
  let count = 0;

  for(let i = 0; i < arrayData.length / 4; i++) {
    arrayPixelData.push([]);
    for(let j = 0; j < 4; j++) {
      arrayPixelData[i].push(arrayData[count]);
      count++;
    }
  }
  // console.log('Array pixels image', arrayPixelData);
  return arrayPixelData;
};

const processing = (callback) => {
  loading.style.display = 'block';
  setTimeout(() => {
    callback?.();
    loading.style.display = 'none';
  }, 1000);
};

getElementsDOM();


// const printReverseImage = () => {
//   let uint8Array, reverseImageData;

//   loading.style.display = 'block';
//   setTimeout(() => {
//     reverseCanvas.width = (img.width);
//     reverseCanvas.height = (img.height);
//     reverseContext = reverseCanvas.getContext('2d');
//     uint8Array = new Uint8ClampedArray(reverseArrayImageData());
//     reverseImageData = new ImageData(uint8Array, img.width, img.height);
//     reverseContext.putImageData(reverseImageData, 0, 0);
//     loading.style.display = 'none';
//   }, 50);
// };

// const reverseArrayImageData = () => {
//   let arrayReverse = [];

//   arrayReverse = [].concat(...arrayPixelData.reverse());
//   console.log('Array reverse image', arrayReverse);
//   return arrayReverse;
// };

// https://stackoverflow.com/questions/9258932/how-to-convert-image-to-byte-array-using-javascript-only-to-store-image-on-sql-s
// https://codepen.io/chrisparton1991/pen/vaBYmE?editors=1011
// https://developer.mozilla.org/en-US/docs/Web/API/ImageData
