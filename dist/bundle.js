/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst { getLinkToImage } = __webpack_require__(/*! ./src/canvasImage */ \"./src/canvasImage.js\");\nconst { updateColor, arrayColor } = __webpack_require__(/*! ./src/updateColor */ \"./src/updateColor.js\");\nconst { chooseTool, fillTool, pencilTool } = __webpack_require__(/*! ./src/tools */ \"./src/tools.js\");\n\nconst currentColor = document.querySelector('input');\nconst range = document.getElementById('range');\nconst searchInput = document.querySelector('.searchInput');\nconst spanSize = document.querySelector('.rangeValue');\nconst canvas = document.getElementById('myCanvas');\nconst context = canvas.getContext('2d');\n\n// start tool\npencilTool(document.querySelector('.pencil'));\n\n// storage---------------------------------------\nconst dataURL = localStorage.getItem(canvas);\nconst img = new Image();\nimg.src = dataURL;\nimg.onload = () => {\n  context.drawImage(img, 0, 0);\n};\n\ncurrentColor.addEventListener('input', () => {\n  arrayColor.push(currentColor.value);\n  updateColor();\n});\n\nrange.addEventListener('input', ({ target }) => {\n  spanSize.innerHTML = target.value;\n  getLinkToImage(searchInput.value, target.value);\n});\n\ndocument.addEventListener('keydown', ({ code, target }) => {\n  if (code === 'KeyP' && target.tagName !== 'INPUT') {\n    pencilTool(document.querySelector('.pencil'));\n  }\n  if (code === 'KeyB' && target.tagName !== 'INPUT') {\n    fillTool(document.querySelector('.fill'));\n  }\n  if (code === 'KeyC' && target.tagName !== 'INPUT') {\n    chooseTool(document.querySelector('.choose'));\n  }\n});\n\ndocument.addEventListener('click', ({ target }) => {\n  if (target.classList[1] === 'pencil') {\n    pencilTool(target);\n  }\n  if (target.classList[1] === 'fill') {\n    fillTool(target);\n  }\n  if (target.classList[1] === 'choose') {\n    chooseTool(target);\n  }\n  if (target.classList[1] === 'redcolor') {\n    arrayColor.push('#ff0000');\n    updateColor();\n  }\n  if (target.classList[1] === 'bluecolor') {\n    arrayColor.push('#0000ff');\n    updateColor();\n  }\n  if (target.classList[1] === 'precolor' && arrayColor.length > 1) {\n    arrayColor.pop();\n    updateColor();\n  }\n  if (target.classList[0] === 'getlink') {\n    getLinkToImage(searchInput.value);\n  }\n  updateColor();\n});\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/bresenham.js":
/*!**************************!*\
  !*** ./src/bresenham.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getPixel(imageData, x, y) {\n  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {\n    return [-1, -1, -1, -1]; // impossible color\n  }\n  const offset = (y * imageData.width + x) * 4;\n  return imageData.data.slice(offset, offset + 4);\n}\n\nfunction setPixel(imageData, x, y, color) {\n  const offset = (y * imageData.width + x) * 4;\n  imageData.data[offset + 0] = color[0];\n  imageData.data[offset + 1] = color[1];\n  imageData.data[offset + 2] = color[2];\n  imageData.data[offset + 3] = color[0];\n}\n\nfunction colorsMatch(a, b) {\n  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];\n}\n\nfunction floodFill(ctx, x, y, fillColor) {\n  // read the pixels in the canvas\n  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);\n\n  // get the color we're filling\n  const targetColor = getPixel(imageData, x, y);\n\n  // check we are actually filling a different color\n  if (!colorsMatch(targetColor, fillColor)) {\n    const pixelsToCheck = [x, y];\n    while (pixelsToCheck.length > 0) {\n      const y = pixelsToCheck.pop();\n      const x = pixelsToCheck.pop();\n      const currentColor = getPixel(imageData, x, y);\n      if (colorsMatch(currentColor, targetColor)) {\n        setPixel(imageData, x, y, fillColor);\n        pixelsToCheck.push(x + 1, y);\n        pixelsToCheck.push(x - 1, y);\n        pixelsToCheck.push(x, y + 1);\n        pixelsToCheck.push(x, y - 1);\n      }\n    }\n    ctx.putImageData(imageData, 0, 0);\n  }\n}\n\nmodule.exports = {\n  floodFill,\n};\n\n\n//# sourceURL=webpack:///./src/bresenham.js?");

/***/ }),

/***/ "./src/canvasImage.js":
/*!****************************!*\
  !*** ./src/canvasImage.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const CLIENT_ID = '87e26779aa6242a2b2fc8e863886185d1d1f07215e4890071e45448baedf8950';\nconst URL_API = 'https://api.unsplash.com/';\nconst canvas = document.getElementById('myCanvas');\nconst context = canvas.getContext('2d');\nconst searchInput = document.querySelector('.searchInput');\n\nasync function getLinkToImage(n, s) {\n  if (!new RegExp('[a-zA-Z]').test(n)) {\n    searchInput.value = 'invalid value';\n    searchInput.setAttribute('style', 'color:red;font-weight:700;');\n    setTimeout(() => {\n      searchInput.value = '';\n      searchInput.removeAttribute('style');\n    }, 3000);\n  }\n  let size = s;\n\n  if (s === undefined) { // input from click 'load' button\n    const url = `${URL_API}photos/random?query=town,${n}&client_id=${CLIENT_ID}`;\n    const promise = fetch(url)\n      .then((response) => response.json());\n    const result = await promise;\n    size = 512;\n    const image = new Image();\n    image.crossOrigin = 'Anonymous';\n    image.onload = drawImageActualSize;\n    image.src = result.urls.small;\n    context.imageSmoothingEnabled = false;\n  } else { // input from change size\n    const dataURL = localStorage.getItem(canvas);\n    const img = new Image(size, size);\n    img.src = dataURL;\n    context.imageSmoothingEnabled = false;\n    img.onload = function storage() {\n      canvas.width = size;\n      canvas.height = size;\n      context.drawImage(img, 0, 0, this.width, this.height);\n    };\n  }\n\n  function drawImageActualSize() {\n    canvas.width = size;\n    canvas.height = size;\n\n    if (this.naturalWidth > this.naturalHeight) {\n      context.drawImage(this, 0, (size - ((512 - this.naturalWidth) + this.naturalHeight)) / 2, (512 - this.naturalWidth) + this.naturalWidth, (512 - this.naturalWidth) + this.naturalHeight);\n    }\n    if (this.naturalWidth < this.naturalHeight) {\n      context.drawImage(this, (size - ((512 - this.naturalHeight) + this.naturalWidth)) / 2, 0, (512 - this.naturalHeight) + this.naturalWidth, (512 - this.naturalHeight) + this.naturalHeight);\n    }\n    localStorage.setItem(canvas, canvas.toDataURL());\n  }\n}\n\nconst grayscale = () => {\n  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);\n  const { data } = imageData;\n  for (let i = 0; i < data.length; i += 4) {\n    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;\n    data[i] = avg; // red\n    data[i + 1] = avg; // green\n    data[i + 2] = avg; // blue\n  }\n  context.putImageData(imageData, 0, 0);\n  if (canvas.width === 512) { localStorage.setItem(canvas, canvas.toDataURL()); }\n};\nconst grayscalee = document.getElementsByClassName('grayscalebtn');\ngrayscalee[0].addEventListener('click', grayscale);\n\nmodule.exports = {\n  getLinkToImage,\n};\n\n\n//# sourceURL=webpack:///./src/canvasImage.js?");

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { floodFill } = __webpack_require__(/*! ./bresenham */ \"./src/bresenham.js\");\nconst { arrayColor } = __webpack_require__(/*! ./updateColor */ \"./src/updateColor.js\");\n\nconst canvas = document.getElementById('myCanvas');\nconst context = canvas.getContext('2d');\ncanvas.width = 512; canvas.height = 512;\nconst pixelSize = 8;\ncontext.fillStyle = '#00ff00';\nlet isDrawing = false;\n\nconst pencilmd = ({ layerX, layerY }) => {\n  context.fillRect(Math.floor(layerX / pixelSize) * pixelSize, Math.floor(layerY / pixelSize) * pixelSize, pixelSize, pixelSize);\n  isDrawing = true;\n  if (canvas.width === 512) {\n    localStorage.setItem(canvas, canvas.toDataURL());\n  }\n};\nconst pencilmm = ({ layerX, layerY }) => {\n  if (isDrawing === true) {\n    context.fillRect(Math.floor(layerX / pixelSize) * pixelSize, Math.floor(layerY / pixelSize) * pixelSize, pixelSize, pixelSize);\n  }\n};\nconst pencilmu = () => {\n  if (isDrawing === true) {\n    if (canvas.width === 512) {\n      localStorage.setItem(canvas, canvas.toDataURL());\n    }\n    isDrawing = false;\n  }\n};\n\nconst fillmd = ({ layerX, layerY }) => {\n  const curC = arrayColor[arrayColor.length - 1];\n  const rgb = [parseInt(curC.substr(1, 2), 16), parseInt(curC.substr(3, 2), 16), parseInt(curC.substr(5, 2), 16), 255];\n  floodFill(context, layerX, layerY, rgb);\n  if (canvas.width === 512) {\n    localStorage.setItem(canvas, canvas.toDataURL());\n  }\n};\n\nconst choosemd = ({ layerX, layerY }) => {\n  let intovalue = '#';\n  const imgData = context.getImageData(layerX, layerY, 1, 1);\n  for (let i = 0; i < 3; i += 1) {\n    if (imgData.data[i] === 0) {\n      intovalue += '00';\n    } else {\n      intovalue += imgData.data[i].toString(16);\n    }\n  }\n  arrayColor.push(intovalue);\n};\n\nfunction listen(eventOne, funcOne, eventTwo, funcTwo, eventThree, funcThree) {\n  canvas.addEventListener(eventOne, funcOne);\n  canvas.addEventListener(eventTwo, funcTwo);\n  canvas.addEventListener(eventThree, funcThree);\n}\nfunction removelisten(eventOne, funcOne, eventTwo, funcTwo, eventThree, funcThree) {\n  canvas.removeEventListener(eventOne, funcOne);\n  canvas.removeEventListener(eventTwo, funcTwo);\n  canvas.removeEventListener(eventThree, funcThree);\n}\n\nfunction background(elem) {\n  const icon = document.querySelectorAll('.icon');\n  for (let i = 0; i < icon.length; i += 1) {\n    icon[i].style.background = 'none';\n  }\n  elem.style.background = 'grey';\n}\nfunction chooseTool(targ) {\n  background(targ);\n  removelisten('mousedown', fillmd);\n  removelisten('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);\n  listen('mousedown', choosemd);\n}\nfunction fillTool(targ) {\n  background(targ);\n  removelisten('mousedown', choosemd);\n  removelisten('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);\n  listen('mousedown', fillmd);\n}\nfunction pencilTool(targ) {\n  background(targ);\n  removelisten('mousedown', fillmd);\n  removelisten('mousedown', choosemd);\n  listen('mousedown', pencilmd, 'mousemove', pencilmm, 'mouseup', pencilmu);\n}\n\nmodule.exports = {\n  chooseTool,\n  fillTool,\n  pencilTool,\n};\n\n\n//# sourceURL=webpack:///./src/tools.js?");

/***/ }),

/***/ "./src/updateColor.js":
/*!****************************!*\
  !*** ./src/updateColor.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const canvas = document.getElementById('myCanvas');\nconst context = canvas.getContext('2d');\nconst arrayColor = ['#00ff00'];\nconst currentColor = document.querySelector('input');\nconst previousColor = document.querySelector('.previousColor');\n\nfunction updateColor() {\n  const lastcolor = arrayColor[arrayColor.length - 1];\n  context.fillStyle = lastcolor;\n  currentColor.value = lastcolor;\n  previousColor.style.background = arrayColor[arrayColor.length - 2];\n}\n\nmodule.exports = {\n  updateColor,\n  arrayColor,\n};\n\n\n//# sourceURL=webpack:///./src/updateColor.js?");

/***/ })

/******/ });