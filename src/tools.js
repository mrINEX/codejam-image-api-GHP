const { floodFill } = require('./bresenham');
const { arrayColor } = require('./updateColor');

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
canvas.width = 512; canvas.height = 512;
const pixelSize = 8;
context.fillStyle = '#00ff00';
let isDrawing = false;

const pencilmd = ({ layerX, layerY }) => {
  context.fillRect(Math.floor(layerX / pixelSize) * pixelSize, Math.floor(layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
  isDrawing = true;
  if (canvas.width === 512) {
    localStorage.setItem(canvas, canvas.toDataURL());
  }
};
const pencilmm = ({ layerX, layerY }) => {
  if (isDrawing === true) {
    context.fillRect(Math.floor(layerX / pixelSize) * pixelSize, Math.floor(layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
  }
};
const pencilmu = () => {
  if (isDrawing === true) {
    if (canvas.width === 512) {
      localStorage.setItem(canvas, canvas.toDataURL());
    }
    isDrawing = false;
  }
};

const fillmd = ({ layerX, layerY }) => {
  const curC = arrayColor[arrayColor.length - 1];
  const rgb = [parseInt(curC.substr(1, 2), 16), parseInt(curC.substr(3, 2), 16), parseInt(curC.substr(5, 2), 16), 255];
  floodFill(context, layerX, layerY, rgb);
  if (canvas.width === 512) {
    localStorage.setItem(canvas, canvas.toDataURL());
  }
};

const choosemd = ({ layerX, layerY }) => {
  let intovalue = '#';
  const imgData = context.getImageData(layerX, layerY, 1, 1);
  for (let i = 0; i < 3; i += 1) {
    if (imgData.data[i] === 0) {
      intovalue += '00';
    } else {
      intovalue += imgData.data[i].toString(16);
    }
  }
  arrayColor.push(intovalue);
};

function listen(eventOne, funcOne, eventTwo, funcTwo, eventThree, funcThree) {
  canvas.addEventListener(eventOne, funcOne);
  canvas.addEventListener(eventTwo, funcTwo);
  canvas.addEventListener(eventThree, funcThree);
}
function removelisten(eventOne, funcOne, eventTwo, funcTwo, eventThree, funcThree) {
  canvas.removeEventListener(eventOne, funcOne);
  canvas.removeEventListener(eventTwo, funcTwo);
  canvas.removeEventListener(eventThree, funcThree);
}

function background(elem) {
  const icon = document.querySelectorAll('.icon');
  for (let i = 0; i < icon.length; i += 1) {
    icon[i].style.background = 'none';
  }
  elem.style.background = 'grey';
}
function chooseTool(targ) {
  background(targ);
  removelisten('mousedown', fillmd);
  removelisten('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);
  listen('mousedown', choosemd);
}
function fillTool(targ) {
  background(targ);
  removelisten('mousedown', choosemd);
  removelisten('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);
  listen('mousedown', fillmd);
}
function pencilTool(targ) {
  background(targ);
  removelisten('mousedown', fillmd);
  removelisten('mousedown', choosemd);
  listen('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);
}

module.exports = {
  chooseTool,
  fillTool,
  pencilTool,
};
