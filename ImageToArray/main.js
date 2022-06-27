// ------- Variables -------

let fileValue;
let img, imgFile;
let imgInfo = {};
let originalCanvas, originalContext;
let arrayData = [];
let arrayPixelData = [];
let lengthPixelData = 0;

let loading;
let inputHdRho;
let inputChannel;
let spanInfoTheorem;
let btnCollapseInfo;

let containerCanvas;
let containerInfo;
let containerChannel;

// ------- Functions -------

const getElementsDOM = () => {
  fileValue = document.getElementById('inputFileImage');
  loading = document.getElementById('gifLoading');
  inputHdRho = document.getElementById('HdRho');
  inputChannel = document.getElementById('channel');
  spanInfoTheorem = document.getElementById('infoTheorem');
  btnCollapseInfo = document.getElementById('btnCollapseInfo');
  containerCanvas = document.getElementById('container-canvas');
  containerInfo = document.getElementById('container-info');
  containerChannel = document.getElementById('container-channel');
};

const onImageChange = (e) => {
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
    'subPixels': (4 * img.width * img.width)
  });
  originalCanvas = document.createElement('canvas');
  originalCanvas.setAttribute('id', 'originalCanvas')
  originalCanvas.width = img.width;
  originalCanvas.height = img.height;
  originalContext = originalCanvas.getContext('2d');
  originalContext.drawImage(img, 0, 0, img.width, img.height);
  containerCanvas.appendChild(originalCanvas);
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
  lengthPixelData = arrayPixelData.length;
  buildImageInfo({
    'pixels': lengthPixelData
  });
  return arrayPixelData;
};

getElementsDOM();


// https://stackoverflow.com/questions/9258932/how-to-convert-image-to-byte-array-using-javascript-only-to-store-image-on-sql-s
// https://codepen.io/chrisparton1991/pen/vaBYmE?editors=1011
// https://developer.mozilla.org/en-US/docs/Web/API/ImageData
