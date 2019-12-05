const CLIENT_ID = '87e26779aa6242a2b2fc8e863886185d1d1f07215e4890071e45448baedf8950';
const URL_API = 'https://api.unsplash.com/';
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const searchInput = document.querySelector('.searchInput');

async function getLinkToImage(n, s) {
  if (!new RegExp('[a-zA-Z]').test(n)) {
    searchInput.value = 'invalid value';
    searchInput.setAttribute('style', 'color:red;font-weight:700;');
    setTimeout(() => {
      searchInput.value = '';
      searchInput.removeAttribute('style');
    }, 3000);
  }
  let size = s;

  if (s === undefined) { // input from click 'load' button
    const url = `${URL_API}photos/random?query=town,${n}&client_id=${CLIENT_ID}`;
    const promise = fetch(url)
      .then((response) => response.json());
    const result = await promise;
    size = 512;
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = drawImageActualSize;
    image.src = result.urls.small;
    context.imageSmoothingEnabled = false;
  } else { // input from change size
    const dataURL = localStorage.getItem(canvas);
    const img = new Image(size, size);
    img.src = dataURL;
    context.imageSmoothingEnabled = false;
    img.onload = function storage() {
      canvas.width = size;
      canvas.height = size;
      context.drawImage(img, 0, 0, this.width, this.height);
    };
  }

  function drawImageActualSize() {
    canvas.width = size;
    canvas.height = size;

    if (this.naturalWidth > this.naturalHeight) {
      context.drawImage(this, 0, (size - ((512 - this.naturalWidth) + this.naturalHeight)) / 2, (512 - this.naturalWidth) + this.naturalWidth, (512 - this.naturalWidth) + this.naturalHeight);
    }
    if (this.naturalWidth < this.naturalHeight) {
      context.drawImage(this, (size - ((512 - this.naturalHeight) + this.naturalWidth)) / 2, 0, (512 - this.naturalHeight) + this.naturalWidth, (512 - this.naturalHeight) + this.naturalHeight);
    }
    localStorage.setItem(canvas, canvas.toDataURL());
  }
}

const grayscale = () => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  context.putImageData(imageData, 0, 0);
  if (canvas.width === 512) { localStorage.setItem(canvas, canvas.toDataURL()); }
};
const grayscalee = document.getElementsByClassName('grayscalebtn');
grayscalee[0].addEventListener('click', grayscale);

module.exports = {
  getLinkToImage,
};
