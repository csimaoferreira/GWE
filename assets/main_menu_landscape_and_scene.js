///////////////////////////////////////////////////////////////


function createMainMenuScene(scene_selection){

  var turbine1;
  turbine1 = createWindTurbineUnit(set_wind_turbine_design[0]);
  var turbine2
  turbine2 = createWindTurbineUnit(set_wind_turbine_design[1]);
  turbine2.position.x = -70;

  mainmenu_scene.add(turbine1);
  mainmenu_scene.add(turbine2);
  //sandbox_scene.add(weu_3Dobj2);

  createLandscapeWorld(mainmenu_scene,landscape_definition);
  // mainmenu_scene.add(loclandscape);


  // var loclocation = createLocationIdentifier(1)
  // mainmenu_scene.add(loclocation);

  createLights(mainmenu_scene);


};
