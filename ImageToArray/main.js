// ------- Variables -------

let fileValue;
let img, imgFile;
let originalCanvas, normalContext;
let txtArea;
let reverseCanvas, reverseContext;
let dataURL;
let arrayData = [];
let arrayPixelData = [];
let loading;

// ------- Functions -------

const getElementsDOM = () => {
  fileValue = document.getElementById('inputFileImage');
  originalCanvas = document.getElementById('originalCanvas');
  reverseCanvas = document.getElementById('reverseCanvas');
  loading = document.getElementById('gifLoading');
  txtArea = document.getElementById('txtArrayPixels');
};

const onImageChange = (e) => {
  loading.style.display = 'block';
  setTimeout(() => {
    console.log('Image loaded info:');
    console.table(e.target.files[0]);
    imgFile = URL.createObjectURL(e.target.files[0]);
    createImage(imgFile, printOriginalImage);
    loading.style.display = 'none';
  }, 50);
};

const createImage = (imgFile, callback) => {
  img = document.createElement('img');
  img.onload = () => callback(img);
  img.setAttribute('src', imgFile);
};

const printOriginalImage = () => {
  originalCanvas.width = img.width;
  originalCanvas.height = img.height;
  normalContext = originalCanvas.getContext('2d');
  normalContext.drawImage(img, 0, 0, img.width, img.height);
};

const getArrayImage = () => {
  loading.style.display = 'block';
  setTimeout(() => {
    for(let y = 0; y < originalCanvas.height; y++) {
      for(let x = 0; x < originalCanvas.width; x++) {
        let pixelData = normalContext.getImageData(x, y, 1, 1).data;
        arrayData.push(pixelData[0]); // red
        arrayData.push(pixelData[1]); // green
        arrayData.push(pixelData[2]); // blue
        arrayData.push(pixelData[3]); // alpha
      }
    }
    console.log('Array normal image', arrayData);
    getArrayPixelsOfImage(arrayData);
    loading.style.display = 'none';
  }, 50);
};

const getArrayPixelsOfImage = (arrayData) => {
  let count = 0;

  for(let i = 0; i < arrayData.length / 4; i++) {
    arrayPixelData.push([]);
    for(let j = 0; j < 4; j++) {
      arrayPixelData[i].push(arrayData[count]);
      count++;
    }
  }
  console.log('Array pixels image', arrayPixelData);
  return arrayPixelData;
};

const printReverseImage = () => {
  let uint8Array, reverseImageData;

  loading.style.display = 'block';
  setTimeout(() => {
    reverseCanvas.width = (img.width);
    reverseCanvas.height = (img.height);
    reverseContext = reverseCanvas.getContext('2d');
    uint8Array = new Uint8ClampedArray(reverseArrayImageData());
    reverseImageData = new ImageData(uint8Array, img.width, img.height);
    reverseContext.putImageData(reverseImageData, 0, 0);
    loading.style.display = 'none';
  }, 50);
};

const reverseArrayImageData = () => {
  let arrayReverse = [];

  arrayReverse = [].concat(...arrayPixelData.reverse());
  console.log('Array reverse image', arrayReverse);
  return arrayReverse;
};

getElementsDOM();

// https://stackoverflow.com/questions/9258932/how-to-convert-image-to-byte-array-using-javascript-only-to-store-image-on-sql-s
// https://codepen.io/chrisparton1991/pen/vaBYmE?editors=1011
// https://developer.mozilla.org/en-US/docs/Web/API/ImageData
