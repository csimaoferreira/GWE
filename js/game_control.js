// define game status controls and operational function





// function associated to the button Start game menu
// button in id="game_start_menu"

function onclickof_button_main_menu_start(){
  WEGMode.Game = true;

  var   localcontainer = document.getElementById("world");
  localcontainer.style.display= "inline"; // make worl appear

  var   localcontainer = document.getElementById("main_menu_container");
  localcontainer.style.display= "none"; // amke main menu disappear

  mission = new mission_OldPersia_level1(); // temporary mission definition


  if (!gamescene_created){
    // createScene();

    var tempreturn = createScene('world',mission.camerainput.position[0],
    mission.camerainput.position[1],mission.camerainput.position[2],mission.camerainput.fieldofview,
    mission.camerainput.farPlane, mission.camerainput.lookat);
    game_scene = tempreturn[0];
    mission.scene = game_scene;
    game_renderer = tempreturn[1];
    mission.renderer = game_renderer;
    game_camera = tempreturn[2];
    mission.camera = game_camera;

    gamescene_created=true;
    gametime = 0;
    mission.WES= new windenergysystem(game_scene);

  };

  // createLandscapeworld_A(game_scene, landscape_definition);
  mission.add_landscape_to_scene()


  createLights(mission.scene);

  // set one location as active
  activate_deactivate_location(mission.scene,"all",false)
  activate_deactivate_location(mission.scene,"one",true)

  // onclickof_button_sandbox_menu_build()



  // var locweu_3Dobj2 = new createWindTurbineUnit(set_wind_turbine_design[0]);


  // game_scene.add(locweu_3Dobj2);

  loop()

};






// function associated to the button install in the oeprational menu
// button id = button_game_menu_operdesign_id_install
function onclickof_button_game_menu_operdesign_id_install(){
  WEGMode.Sandbox = true;

  var   localcontainer = document.getElementById("blueprint_design_box");
  localcontainer.style.display= "inline";


  populate_options_blueprint()

  // if (!sandboxscene_created){createSceneSandbox();  sandboxscene_created=true;};

  if (!sandboxscene_created){
    // createScene();
    var tempreturn = createScene('game_sandboxcanvas',0,60,300,50,10000);
    sandbox_scene = tempreturn[0];
    sandbox_renderer = tempreturn[1];
    sandbox_camera = tempreturn[2];

    sandboxscene_created=true;
  };

  createLights(sandbox_scene);
  var locweu_3Dobj21 = new createWindTurbineUnit(set_wind_turbine_design[0]);



  sandbox_scene.add(locweu_3Dobj21);

  onchange_sandbox_select(true)

  loop()



};

// function associated to the button decomission in the operational menu
// button id = button_game_menu_operdesign_id_install
function decomission_button_game_menu_operdesign(){


  // get active location
  var active_locations = identify_active_location(game_scene);
  //  alert(active_locations)
  for (var i = 0; i < active_locations.length; i++) {
    if (active_locations[i].location_built) {
      //turbine2 = createWindTurbineUnit(set_wind_turbine_design[0]);
      // alert(active_locations[i].position.x)
      // turbine2.position.copy(active_locations[i].position);
      // turbine2.locationWEU = active_locations[i];
      // active_locations[i].WEUinstalled=turbine2;
      game_scene.remove(active_locations[i].WEUinstalled);
      active_locations[i].location_built = false;
      active_locations[i].location_activate(true);
    }
  }


};


// function associated to the button decomission in the operational menu
// button id = button_game_menu_operdesign_id_install
function repair_button_game_menu_operdesign(){


  // get active location
  var active_locations = identify_active_location(game_scene);
  //  alert(active_locations)
  for (var i = 0; i < active_locations.length; i++) {
    if (active_locations[i].location_built) {
      var WEU = active_locations[i].WEUinstalled.WEU;
      WEU.repair_WEU();
    }
  }


};


function control_button_game_menu_operdesign(){


  // get active location
  var active_locations = identify_active_location(game_scene);
  //  alert(active_locations)
  for (var i = 0; i < active_locations.length; i++) {
    if (active_locations[i].location_built) {
      var WEU = active_locations[i].WEUinstalled.WEU;
      var temp = WEU.modeofoperation;
      WEU.modeofoperation = 1-temp;
    }
  }



};




function information_button_game_menu_operdesign(){

  var textlocation = document.getElementById("game_operational_information");

  if (textlocation.style.display=="none"){  textlocation.style="display:block"}
  else{textlocation.style.display="none"};
};






function onclickof_button_sandbox_menu_cancel(){
  WEGMode.Sandbox = false;
  weu_3Dobj2=[];
  sandbox_scene.children = [];
  var   localcontainer = document.getElementById("blueprint_design_box");
  localcontainer.style.display= "none";

  var   localcontainer2 = document.getElementById("game_menu_operdes");
  localcontainer2.style.display= "block";

  // var   localcontainer3 = document.getElementById("TUDelftMOOC");
  //   localcontainer3.style.display= "none";


};


function onclickof_button_sandbox_menu_build(){
  // this function builds a wind energy unit at the selected location



  // get active location
  var active_locations = identify_active_location(game_scene);
  //  alert(active_locations)
  for (var i = 0; i < active_locations.length; i++) {
    if (!active_locations[i].location_built) {

      var selection_design = onchange_sandbox_select(false);
      // alert(selection_design.length)
      if(selection_design[0] ==""){selection_design=[0 , 0, 0, 0, 0, 0, 0, 0]};
      // alert(selection_design)
      turbine2 = createWindTurbineUnit(set_wind_turbine_design[selection_design[0]]);
      // alert(active_locations[i].position.x)
      turbine2.position.copy(active_locations[i].position);
      turbine2.locationWEU = active_locations[i];

      active_locations[i].WEUinstalled=turbine2;
      game_scene.add(turbine2);
      game_scene.WES.update_capital_bulk(-1*turbine2.WEU.parameter_cost_weu);
      active_locations[i].location_built = true;
      active_locations[i].location_activate(true);
    }
  }


  // var turbine2
  // turbine2 = createWindTurbineUnit(set_wind_turbine_design[1]);
  // turbine2.position.x = -70;



};





function populate_options_blueprint(){
  // alert("I am here")


  var data = []
  data.push(["Modern turbine",   "18th century Dutch" ,   "16th century Dutch"]);
  data.push(["Large",   "Medium" ,   "Small"]);
  data.push(["Rotor: 1 blade",   "Rotor: 2 blades" ,   "Rotor: 3 blades", "Rotor: 4 blades", "Rotor: 5 blades"]);


  var elm;
  var i,j;
  var name, content,option;
  content=[];
  for (j = 0; j < 8; j++) {

    elm = document.getElementById(("blueprint_dropdown" + (j+1))); // elm is a <select> element
    elm.style.display="none";
  };
  for (j = 0; j < 3; j++) {


    elm = document.getElementById(("blueprint_dropdown" + (j+1))); // elm is a <select> element
    elm.style.display="inline";

    if(j<data.length){
      content = data[j];
      // alert(content)

      for (i = 0, len = content.length; i < len; i++) {
        name = content[i];

        // create an option element
        option = document.createElement("option");
        option.value = i;
        option.textContent = name;

        // add option
        elm.add(option);
      };
    };
  };

};


function onchange_sandbox_select(input){
  var selection=[];
  for (j = 0; j < 8; j++) {

    var x = document.getElementById(("blueprint_dropdown" + (j+1))).value;
    selection.push(x)
  };

  // var selection_design= new onchange_sandbox_select();
  if(input){
    var locweu_3Dobj21 = new createWindTurbineUnit(set_wind_turbine_design[selection[0]]);
    change_WEU_sandbox(sandbox_scene,locweu_3Dobj21)
  }else{  return selection }

};






function windenergysystem(pointer_scene){
  this.capital = 0;
  this.power = 13579;
  this.CoE = 85;
  this.interest_rate = 0.04;
  this.public_acceptance = 0.5;
  this.cost_of_capital = 0;
  this.operational_costs=0;
  this.update_power = function(locscene){
    var power;
    var i;
    power=0;
    for (i = 0; i < locscene.children.length; i++) {
      nameobj = locscene.children[i].name;
      test_is_windenergyunit=nameobj.indexOf("windturbineunit");
      if(test_is_windenergyunit==0){

        wtunit=locscene.children[i];
        power +=wtunit.WEU.power_delivered;
      };

    };
    this.power=power;
  };

  this.update_add_operational_costs = function(locscene){
    var operational_costs;
    var i;
    operational_costs=0;
    for (i = 0; i < locscene.children.length; i++) {
      nameobj = locscene.children[i].name;
      test_is_windenergyunit=nameobj.indexOf("windturbineunit");
      if(test_is_windenergyunit==0){

        wtunit=locscene.children[i];
        operational_costs +=wtunit.WEU.total_costs;
      };

    };
    this.operational_costs=operational_costs;
    this.capital+=this.operational_costs;
  };

  this.update_capital_energy_sale = function(deltaTime){
    this.capital+=(this.power*deltaTime*this.CoE/1000000);
  };
  this.update_capital_bulk = function(deltacapital){
    this.capital+=deltacapital;
  };
  this.update_public_acceptance = function(locscene){
    var negative_public;
    var i;
    negative_public=0;
    for (i = 0; i < locscene.children.length; i++) {
      nameobj = locscene.children[i].name;
      test_is_windenergyunit=nameobj.indexOf("windturbineunit");
      if(test_is_windenergyunit==0){

        wtunit=locscene.children[i];
        negative_public +=wtunit.WEU.public_acceptance;
      };
    };
    this.public_acceptance = this.power/2.1 + negative_public*0.5;
  };
  this.calculate_add_capital_cost = function(deltaTime){
    var hourly_interest_rate = Math.pow((1+this.interest_rate),1/(365*24));
    var variation = Math.pow(hourly_interest_rate, deltaTime) -1;
    this.cost_of_capital = Math.min(this.capital*variation, 0);
    this.capital += this.cost_of_capital
  };


};
