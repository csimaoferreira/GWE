// add variables for the game

// mission VARIABLES
var mission; //current mission

// Game control variables
var WEGMode ={
  StartMenu: true, // initialize on intromenu
  Sandbox: false,
  Game: false // we do not start in the sandbox
};

//COLORS - pallete of colors used in the game
var Colors = {
  red:0xf25346,
  white:0xd8d0d1,
  brown:0x59332e,
  brownDark:0x23190f,
  pink:0xF5986E,
  yellow:0xf4ce93,
  blue:0x68c3c0,
  green:0x00b386
};

var ColorsDesert1 = {
  color1:0x85622A,
  color2:0xE6A644,
  color3:0xE18339,
  color4:0xB6571D,
  color5:0x8C3313
};



// variables to control time
var deltaTime = 0;
var newTime = new Date().getTime();
var oldTime = new Date().getTime();
var gametime =0;
var conversion_time_to_gametime = 1;// miliseconds to hours
// var gametime_old = 0;

// variables of wind
var wind = new THREE.Vector3( 10, 0, 10 );


//THREEJS RELATED VARIABLES for control of the scene and field of view at WEG main menu
var mainmenu_scene,
mainmenu_camera,
mainmenu_renderer;

// THREEJS variables for canvas in sandbox
var game_scene,
game_renderer,
game_camera;
var gamescene_created = false;

// THREEJS variables for canvas in sandbox
var sandbox_scene,
sandbox_renderer,
sandbox_camera;
var sandboxscene_created=false;

// // LIGHTS
//
// var ambientLight, hemisphereLight, shadowLight;
//
// // landscape and world variables
// var landscape;
//

// Widn Energy Units variables
// var weu_3Dobj;
