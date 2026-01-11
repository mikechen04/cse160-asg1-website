// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program

/*

python3 -m http.server 

used for localhost testing

parts left: 9 10 11 12 13

*/

var VSHADER_SOURCE =
  `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }
  `

// Fragment shader program
var FSHADER_SOURCE =
  `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
  `

// Global Variables
let canvas;
let gl;
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5.0;
let g_selectedType = 0; // 0 for POINT, 1 for TRIANGLE, 2 for CIRCLE
let g_selectedSegments = 20; // Number of segments for circles
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  if (!canvas) {
    console.log('Failed to get the canvas element');
    return false;
  }

  // Get the rendering context for WebGL
  //gl = getWebGLContext(canvas);

  gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return false;
  }
  return true;
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return false;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return false;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return false;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return false;
  }
  return true;
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

function addActionsForHtmlUI(){
  var greenBtn = document.getElementById('green');
  if (greenBtn) greenBtn.onclick = function(){ g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
  
  var redBtn = document.getElementById('red');
  if (redBtn) redBtn.onclick = function(){ g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };
  
  var clearBtn = document.getElementById('clearButton');
  if (clearBtn) clearBtn.onclick = function(){ g_shapesList = []; renderAllShapes(); };

  var pointBtn = document.getElementById('pointButton');
  if (pointBtn) pointBtn.onclick = function(){ g_selectedType = POINT; };
  
  var triBtn = document.getElementById('triButton');
  if (triBtn) triBtn.onclick = function(){ g_selectedType = TRIANGLE; };
  
  var circleBtn = document.getElementById('circleButton');
  if (circleBtn) circleBtn.onclick = function(){ g_selectedType = CIRCLE; };

  var redSlide = document.getElementById('redSlide');
  if (redSlide) redSlide.addEventListener('mouseup', function() { g_selectedColor[0] = this.value / 100.0; });
  
  var greenSlide = document.getElementById('greenSlide');
  if (greenSlide) greenSlide.addEventListener('mouseup', function() { g_selectedColor[1] = this.value / 100.0; });
  
  var blueSlide = document.getElementById('blueSlide');
  if (blueSlide) blueSlide.addEventListener('mouseup', function() { g_selectedColor[2] = this.value / 100.0; });

  var sizeSlide = document.getElementById('sizeSlide');
  if (sizeSlide) sizeSlide.addEventListener('mouseup', function() { g_selectedSize = this.value; });

  var segmentsSlide = document.getElementById('segmentsSlide');
  if (segmentsSlide) segmentsSlide.addEventListener('mouseup', function() { g_selectedSegments = parseInt(this.value); });
}

function main() {

  if (!setupWebGL()) {
    console.log('Failed to setup WebGL');
    return;
  }
  
  if (!connectVariablesToGLSL()) {
    console.log('Failed to connect variables to GLSL');
    return;
  }
  
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev); } };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = [];
/*
var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point
var g_sizes = [];  // The array to store the size of a point
*/

function click(ev) {
  let [x,y] = convertCoordinatesEventToGL(ev);

  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else if (g_selectedType == CIRCLE) {
    point = new Circle();
    point.segments = g_selectedSegments;
  } else {
    // Default to Point if type is not set
    point = new Point();
  }
  point.position = [x, y, 0.0];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);

  /*if (x >= 0.0 && y >= 0.0) {      // First quadrant
    g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
  } else if (x < 0.0 && y < 0.0) { // Third quadrant
    g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
  } else {                         // Others
    g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
  }
  */

  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  return [x, y];
}

function renderAllShapes() {

  var startTime = performance.now();
  gl.clear(gl.COLOR_BUFFER_BIT);
  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  var duration = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000 / duration), "numdot");

}

function sendTextToHTML(text, htmlID) {
  if (!htmlID) {
    console.log("sendTextToHTML: htmlID parameter is required");
    return;
  }
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}