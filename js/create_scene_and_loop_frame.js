

// create scene

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene(id_of_container,camx,camy,camz,locfieldOfView,locfarPlane,lookatvar) {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  var locscene = new THREE.Scene();
  var locaspectRatio = WIDTH / HEIGHT;
  // var locfieldOfView = 50;
  var locnearPlane = 1;
  // var locfarPlane = 10000;
  var loccamera = new THREE.PerspectiveCamera(
    locfieldOfView,
    locaspectRatio,
    locnearPlane,
    locfarPlane
  );
//  locscene.fog = new THREE.Fog(0xf7d9aa, camz+500,camz+2050);
  loccamera.position.x = camx; //00;
  loccamera.position.y = camy; //100;
  loccamera.position.z = camz; //400;

   loccamera.lookAt(new THREE.Vector3(0, 0, 0));
  if(!(lookatvar==undefined)){ loccamera.lookAt(new THREE.Vector3(lookatvar[0], lookatvar[1], lookatvar[2]));}


  var locrenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  locrenderer.setSize(WIDTH, HEIGHT);

  locrenderer.shadowMap.enabled = true;

  //  container = document.getElementById('world');
  var loccontainer = document.getElementById(id_of_container);
  loccontainer.appendChild(locrenderer.domElement);

  window.addEventListener('resize', handleWindowResize(loccontainer,locrenderer,loccamera), false);

  var tempreturn = [locscene,locrenderer,loccamera];
  return tempreturn;



  /*
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = -Math.PI / 2;
  controls.maxPolarAngle = Math.PI ;

  //controls.noZoom = true;
  //controls.noPan = true;
  //*/
}


// function createSceneSandbox() {
//
//   HEIGHT = window.innerHeight;
//   WIDTH = window.innerWidth;
//
//   sandbox_scene = new THREE.Scene();
//   var sandbox_aspectRatio = WIDTH / HEIGHT;
//   var sandbox_fieldOfView = 50;
//   var sandbox_nearPlane = .1;
//   var sandbox_farPlane = 10000;
//   sandbox_camera = new THREE.PerspectiveCamera(
//     sandbox_fieldOfView,
//     sandbox_aspectRatio,
//     sandbox_nearPlane,
//     sandbox_farPlane
//   );
//   sandbox_scene.fog = new THREE.Fog(0xf7d9aa, 100,950);
//   sandbox_camera.position.x = 00;
//   sandbox_camera.position.z = 300;
//   sandbox_camera.position.y = 60;
//   //camera.lookAt(new THREE.Vector3(0, 400, 0));
//
//   sandbox_renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//   sandbox_renderer.setSize(WIDTH, HEIGHT);
//
//   sandbox_renderer.shadowMap.enabled = true;
//
//   //  container = document.getElementById('world');
//   sandbox_container = document.getElementById('game_sandboxcanvas');
//   sandbox_container.appendChild(sandbox_renderer.domElement);
//
//   window.addEventListener('resize', handleWindowResize(sandbox_container,sandbox_renderer,sandbox_camera), false);
//
//   /*
//   controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.minPolarAngle = -Math.PI / 2;
//   controls.maxPolarAngle = Math.PI ;
//
//   //controls.noZoom = true;
//   //controls.noPan = true;
//   //*/
// }

function handleWindowResize(containa, rendera, cam) {
  HEIGHT = containa.clientHeight;
  WIDTH = containa.clientWidth;
  rendera.setSize(WIDTH, HEIGHT);
  cam.aspect = WIDTH / HEIGHT;
  cam.updateProjectionMatrix();
}





function createLights(scenetarget) {

  var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
// var hemisphereLight = new THREE.HemisphereLight(Colors["red"],0x000000, .9)

  var ambientLight = new THREE.AmbientLight(0xdc8874, .5);

  var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  shadowLight.position.set(1500, 3500, 3500);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -4000;
  shadowLight.shadow.camera.right = 4000;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 10000;
  shadowLight.shadow.mapSize.width = 4096;
  shadowLight.shadow.mapSize.height = 4096;

  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);

  //scene.add(ch);
  scenetarget.add(hemisphereLight);
  scenetarget.add(shadowLight);
  scenetarget.add(ambientLight);


}


function loop(){

  newTime = new Date().getTime();
  deltaTime = newTime-oldTime;
  oldTime = newTime;

  // update wind speed / direction

  var winddirection;

  winddirection = Math.atan2(wind.z,-wind.x);

  var windspeed = 10;

  wind.x = windspeed*Math.cos(newTime/10000*Math.PI);
  wind.z = -Math.abs(windspeed*Math.sin(newTime/10000*Math.PI));


  if(WEGMode.StartMenu){
    update_WEU_scene(mainmenu_scene, deltaTime*conversion_time_to_gametime)
    update_clouds_scene(mainmenu_scene, deltaTime)
    update_windsock(mainmenu_scene, deltaTime)
    mainmenu_renderer.render(mainmenu_scene, mainmenu_camera);
  } ;


  if(WEGMode.Game){
    mission.update_game();
  } ;





  if(WEGMode.Sandbox){
    //   var rotorpointer = weu_3Dobj2.getObjectByName( "rotor" );
    //   var nacellerotorpointer = weu_3Dobj2.getObjectByName("nacellerotorsystem");
    //   nacellerotorpointer.rotation.y -= 0.03/4;
    //   rotorpointer.rotation.x += 0.06;
    //    weu_3Dobj2.rotation.y -= 0.03/4;
    // sandbox_scene.add(locweu_3Dobj21);



    // alert(selection_design)

    update_WEU_scene(sandbox_scene, deltaTime*conversion_time_to_gametime)
    sandbox_renderer.render(sandbox_scene, sandbox_camera);
  } ;


  window.addEventListener( 'mousedown', selectLocationMouse, false);
  requestAnimationFrame(loop);



}








function init(event){

  // UI

  // fieldDistance = document.getElementById("distValue");
  // energyBar = document.getElementById("energyBar");
  // replayMessage = document.getElementById("replayMessage");
  // fieldLevel = document.getElementById("levelValue");
  // levelCircle = document.getElementById("levelCircleStroke");

    //(id_of_container,camx,camy,camz,locfieldOfView,locfarPlane)
  var tempreturn = createScene('main_menu_container',0,60,400,50,10000);
  mainmenu_scene = tempreturn[0];
  mainmenu_renderer = tempreturn[1];
  mainmenu_camera = tempreturn[2];

 createMainMenuScene(1)



  // weu_3Dobj = createWindTurbineUnit(wind_turbine_definition);
  //weu_3Dobj2 = createWindTurbineUnit(wind_turbine_definition);
  // createLights(sandbox_scene);
  // createPlane();
  // createSea();
  // createSky();
  // createCoins();
  // createEnnemies();
  // createParticles();

  // if(ModeSandbox){
  // sandbox_scene.add(weu3Dobj2);
  // } ;


  // onclickof_button_main_menu_start();


  // document.addEventListener('mousemove', handleMouseMove, false);
  // document.addEventListener('touchmove', handleTouchMove, false);
  // document.addEventListener('mouseup', handleMouseUp, false);
  // document.addEventListener('touchend', handleTouchEnd, false);

  loop();


}

window.addEventListener('load', init, false);
