
const { getLinkToImage } = require('./src/canvasImage');
const { updateColor, arrayColor } = require('./src/updateColor');
const { chooseTool, fillTool, pencilTool } = require('./src/tools');

const currentColor = document.querySelector('input');
const range = document.getElementById('range');
const searchInput = document.querySelector('.searchInput');
const spanSize = document.querySelector('.rangeValue');
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// start tool
pencilTool(document.querySelector('.pencil'));

// storage---------------------------------------
const dataURL = localStorage.getItem(canvas);
const img = new Image();
img.src = dataURL;
img.onload = () => {
  context.drawImage(img, 0, 0);
};

currentColor.addEventListener('input', () => {
  arrayColor.push(currentColor.value);
  updateColor();
});

range.addEventListener('input', ({ target }) => {
  spanSize.innerHTML = target.value;
  getLinkToImage(searchInput.value, target.value);
});

document.addEventListener('keydown', ({ code, target }) => {
  if (code === 'KeyP' && target.tagName !== 'INPUT') {
    pencilTool(document.querySelector('.pencil'));
  }
  if (code === 'KeyB' && target.tagName !== 'INPUT') {
    fillTool(document.querySelector('.fill'));
  }
  if (code === 'KeyC' && target.tagName !== 'INPUT') {
    chooseTool(document.querySelector('.choose'));
  }
});

document.addEventListener('click', ({ target }) => {
  if (target.classList[1] === 'pencil') {
    pencilTool(target);
  }
  if (target.classList[1] === 'fill') {
    fillTool(target);
  }
  if (target.classList[1] === 'choose') {
    chooseTool(target);
  }
  if (target.classList[1] === 'redcolor') {
    arrayColor.push('#ff0000');
    updateColor();
  }
  if (target.classList[1] === 'bluecolor') {
    arrayColor.push('#0000ff');
    updateColor();
  }
  if (target.classList[1] === 'precolor' && arrayColor.length > 1) {
    arrayColor.pop();
    updateColor();
  }
  if (target.classList[0] === 'getlink') {
    getLinkToImage(searchInput.value);
  }
  updateColor();
});
