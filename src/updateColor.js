const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const arrayColor = ['#00ff00'];
const currentColor = document.querySelector('input');
const previousColor = document.querySelector('.previousColor');

function updateColor() {
  const lastcolor = arrayColor[arrayColor.length - 1];
  context.fillStyle = lastcolor;
  currentColor.value = lastcolor;
  previousColor.style.background = arrayColor[arrayColor.length - 2];
}

module.exports = {
  updateColor,
  arrayColor,
};
