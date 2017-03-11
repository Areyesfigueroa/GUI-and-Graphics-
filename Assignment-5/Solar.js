/////////////////////////////////////////////////////////////////////////////
//
//  Solar.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;

//---------------------------------------------------------------------------
//
//  Declare our array of planets (each of which is a sphere)
//
// The list of planets to render.  Uncomment any planets that you are
// including in the scene. For each planet in this list, make sure to
// set its distance from the Sun, as well its size, color, and orbit
// around the Sun.

var Planets = {
  Sun : undefined,
  Mercury : undefined,
  Venus : undefined,
  Earth : undefined,
  Moon : undefined,
  Mars : undefined,
  Jupiter : undefined,
  Saturn : undefined,
  Uranus : undefined,
  Neptune : undefined,
  Pluto : undefined
};

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime

//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;

  for (var name in Planets ) {

    // Create a new sphere object for our planet, and assign it into the
    // appropriate place in the Planets dictionary.  And to simplify the code
    // assign that same value to the local variable "p", for later use.

    var planet = Planets[name] = new Sphere();

    // For each planet, we'll add a new property (which itself is a
    // dictionary) that contains the uniforms that we will use in
    // the associated shader programs for drawing the planets.  These
    // uniform's values will be set each frame in render().

    planet.uniforms = {
      color : gl.getUniformLocation(planet.program, "color"),
      MV : gl.getUniformLocation(planet.program, "MV"),
      P : gl.getUniformLocation(planet.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Specify the viewing transformation, and use it to initialize the
  // matrix stack

  V = translate(1.0, 0.0, -0.5*(near + far)); //vector coordinates to init the stack
  ms.load(V);

  //Render planets
  renderPlanet("Sun", ms);
  renderPlanet("Earth", ms);
  renderPlanet("Moon", ms);
  renderPlanet("Mercury", ms); //very small, could not be seen with defalut size
  renderPlanet("Venus", ms);

  renderPlanet("Mars", ms);
  renderPlanet("Jupiter", ms);
  renderPlanet("Saturn", ms);
  renderPlanet("Uranus", ms);
  renderPlanet("Neptune", ms);
  renderPlanet("Pluto", ms);

  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function renderPlanet(name, ms)
{
    var planet, data;
    var translateOffset = 0;
    var scaleOffset = 0;

    var time = (new Date()).getTime() * 0.0002;

    planet = Planets[name];
    data = SolarSystem[name];

    planet.PointMode = false;
/////////////////////////////////////////////////////////////////////////
//Push onto MatrixStack stack switch statement
    switch (name)
    {

      case 'Moon':
        //translate around Earth
        ms.push();
        ms.rotate((360/SolarSystem['Earth'].year) * time, [0, 0, 1]);
        ms.push();
        ms.translate(SolarSystem['Earth'].distance + (translateOffset *1.3), 0, 0);
        break;

      case 'Mercury':
      case "Venus":
      case 'Earth':
      ms.push();
      ms.rotate((360/data.year) * time, [0, 0, 1]);
      ms.push();
      ms.translate(data.distance + translateOffset, 0, 0);
      break;
      case 'Mars':
      case 'Jupiter':
      case 'Saturn':
      case 'Uranus':
      case 'Neptune':
      case 'Pluto':
        ms.push();
        ms.rotate((360/data.year) * time, [0, 0, 1]);
        ms.push();
        ms.translate(data.distance + translateOffset, 0, 0);
        break;
      default:
    }

    //Push scale, setup the program, calculate the matrix stack coordinates,
    // render & pop first element.
      ms.push();
      ms.scale(data.radius + scaleOffset); //scale planets accordingly
      gl.useProgram(planet.program); //sets up the shader program
      gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current())); //math
      gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P)); //math
      gl.uniform4fv(planet.uniforms.color, flatten(data.color));
      planet.render();
      ms.pop(); //return to current state for reuse

      switch (name) {
        case 'Moon':
          ms.pop();
          ms.pop();
          break;

        case 'Mercury':
        case "Venus":
        case 'Earth':
          ms.pop();
          ms.pop();
          break;

        case 'Mars':
        case 'Jupiter':
        case 'Saturn':
        case 'Uranus':
        case 'Neptune':
        case 'Pluto':
          ms.pop();
          ms.pop();
          break;
        default:
      }
}

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 100.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;
