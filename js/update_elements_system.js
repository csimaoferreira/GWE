/////////////////////////////



// update the wind energy units of the scene
function change_WEU_sandbox(locscene,WEUnew){

  var nameobj;
  var test_is_windenergyunit;
  var wtunit;
  var rotorpointer;
  var nacellerotorpointer;
  var i;
  var trans1;
  var winddirection;




  for (i = 0; i < locscene.children.length; i++) {
    nameobj = locscene.children[i].name;
    test_is_windenergyunit=nameobj.indexOf("windturbineunit");
    if(test_is_windenergyunit==0){
      locscene.remove(locscene.children[i])
      locscene.add(WEUnew);
    };

  };

};

// update the wind energy units of the scene
function update_WEU_scene(locscene, delTime){

  var nameobj;
  var test_is_windenergyunit;
  var wtunit;
  var rotorpointer;
  var nacellerotorpointer;
  var i;
  var trans1;
  var winddirection;

  winddirection = Math.atan2(wind.z,-wind.x);



  for (i = 0; i < locscene.children.length; i++) {
    nameobj = locscene.children[i].name;
    test_is_windenergyunit=nameobj.indexOf("windturbineunit");
    if(test_is_windenergyunit==0){

      wtunit=locscene.children[i];
      wtunit.WEU.updateWEU(delTime);
      rotorpointer = wtunit.getObjectByName( "rotor" );
      nacellerotorpointer = wtunit.getObjectByName("nacellerotorsystem");
      // trans1 = 0.2*delTime;
      // nacellerotorpointer.rotation.y -= trans1;
      nacellerotorpointer.rotation.y = winddirection;
      trans1 = 0.002*delTime;
      rotorpointer.rotation.x += trans1;
    };

  };



};


// update the wind energy units of the scene
function update_clouds_scene(locscene, delTime){

  var nameobj;
  var test_is;
  var unit;
  // var rotorpointer;
  // var nacellerotorpointer;
  var i;
  var trans1 ;
  for (i = 0; i < locscene.children.length; i++) {
    nameobj = locscene.children[i].name;
    test_is=nameobj.indexOf("cloud");
    if(test_is==0){
      unit=locscene.children[i];
      // trans1.set(wind);
      // trans1.multiplyScalar((1)*delTime);
      trans1=0.01;
      unit.position.x += (wind.x*delTime*trans1);
      unit.position.y += (wind.y*delTime*trans1);
      unit.position.z += (wind.z*delTime*trans1);

      if (Math.abs(unit.position.x)>2000) { unit.position.x = -Math.sign(unit.position.x)*2000;};
      if (Math.abs(unit.position.z)>2000) { unit.position.z = -Math.sign(unit.position.z)*2000;};


      // rotorpointer = wtunit.getObjectByName( "rotor" );
      // nacellerotorpointer = wtunit.getObjectByName("nacellerotorsystem");
      // trans1 = 0.002/4*delTime;
      // nacellerotorpointer.rotation.y -= trans1;
      //        trans1 = 0.004*delTime;
      // rotorpointer.rotation.x += trans1;
    };

  };

};

// update the wind energy units of the scene
function update_waves(locscene, delTime,newTimeloc){

  var nameobj;
  var test_is;
  var vert;
  // var rotorpointer;
  // var nacellerotorpointer;
  var i;
  var trans1 ;
  for (i = 0; i < locscene.children.length; i++) {
    nameobj = locscene.children[i].name;
    test_is=nameobj.indexOf("waveocean");
    if(test_is==0){
      vert=locscene.children[i].pointer_geom_wave.vertices;
      locscene.children[i].pointer_geom_wave.verticesNeedUpdate=true;
      // alert(i)
      // trans1.set(wind);
      // trans1.multiplyScalar((1)*delTime);
      // trans1=0.001;
      // unit.position.x += (wind.x*delTime*trans1);
      // unit.position.y += (wind.y*delTime*trans1);
      // unit.position.z += (-Math.abs(wind.z*delTime*trans1));
      //
      // if (Math.abs(unit.position.x)>50) { unit.position.x = -Math.sign(unit.position.x)*50;};
      // if (Math.abs(unit.position.z)>50) { unit.position.z = -Math.sign(unit.position.z)*50;};
      //
//      alert()
      var index = 0;
      var vert1z = vert[0].z
  		for(var i=0; i < (vert.length-1); i++) {

            // [i].z = 10*(Math.random()-0.5);
            vert[i].z = 4*Math.sin(vert[i].x/40+  vert[i].z/40 - 0.0005*newTimeloc) ;// + 6*(Math.random()-0.5);


  		}
      vert[(vert.length-1)].z=vert1z;
      // locscene.children[i].pointer_geom_wave.verticesNeedUpdate=true;

      // rotorpointer = wtunit.getObjectByName( "rotor" );
      // nacellerotorpointer = wtunit.getObjectByName("nacellerotorsystem");
      // trans1 = 0.002/4*delTime;
      // nacellerotorpointer.rotation.y -= trans1;
      //        trans1 = 0.004*delTime;
      // rotorpointer.rotation.x += trans1;
    };

  };

};



// update the wind energy units of the scene
function update_windsock(locscene, delTime){

  var nameobj;
  var test_is;
  var unit;
  // var rotorpointer;
  // var nacellerotorpointer;
  var i;
  var trans1 ;
  for (i = 0; i < locscene.children.length; i++) {
    nameobj = locscene.children[i].name;
    test_is=nameobj.indexOf("windsock");
    if(test_is==0){
      unit=locscene.children[i];
      unit.rotation.y =  Math.atan2(-wind.z,+wind.x);
    };

  };

};


// update the wind energy units of the scene
function update_locationidentifiers(locscene, delTime, realTime){

var nameobj;
var test_is;
var unit;
// var rotorpointer;
// var nacellerotorpointer;
var i, j;
var op1 ;
j=0;
for (i = 0; i < locscene.children.length; i++) {
  nameobj = locscene.children[i].name;
  test_is=nameobj.indexOf("LocationIdentifier");
  if(test_is==0){
    if(!locscene.children[i].location_built){
      j +=1;
      unit=locscene.children[i];
      op1=unit.children[0].material.opacity;
      // unit.children[0].material.opacity= Math.abs(Math.sin(op1*Math.PI/5+delTime*1));
      unit.children[0].material.opacity= Math.abs(Math.sin(realTime*0.001 + Math.PI/10*j))*0.5+0.2;
    };
  };

};

};


function update_information_operations(gscene,delTime){

var text1, text2, text3;
text1="";
text2="";
text3="";

var costom;
// get active location
var active_locations = identify_active_location(gscene);
//  alert(active_locations)
for (var i = 0; i < 1; i++) {
  text1 = "Terrain type: " + active_locations[i].location_type + "<br>" +
          "Mean wind speed: " + active_locations[i].location_wind + " m/s <br>" ;


  if (active_locations[i].location_built) {
    var WEU = active_locations[i].WEUinstalled.WEU;

    costom = WEU.total_costs*24*365/delTime;

    text2 = "Turbine health: " + WEU.health.toFixed(2) + "<br>" +
            "Power: " + WEU.power.toFixed(2) + "MW <br>" +
            "Power delivered: " + WEU.power_delivered.toFixed(2) + "MW <br>" +
            "O&M: " + costom.toFixed(3) + "M" + "&#8364" +"/year <br>" ;

  };

  text3 = "<br> <br>" + text1 + "<br> <br>" + text2;
  var textlocation = document.getElementById("game_operational_information");
  textlocation.innerHTML = text3;

};

};
