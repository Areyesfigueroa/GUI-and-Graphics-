var gl = null;
var prog = null;

function init() {

    var canvas = document.getElementById( "webgl-canvas2" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );
    prog = initShaders(gl, "Cone-vertex-shader", "Cone-fragment-shader");
    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
}

window.onload = init;
