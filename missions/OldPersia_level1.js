//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function mission_OldPersia_level1(){
  // this function defines the mission OldPersia_level1
  this.name = "OldPersia";
  this.level = 1;
  //define camera setup
  this.camerainput = {position : [-400,400,600], fieldofview : 60, farPlane : 2000000000,  lookat : [0, 0, 0 ]};
  /////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////

  // add landascape
  this.add_landscape_to_scene = function(){
    create_landscape_OldPersia_level1(this.scene);
  };
  ////
  this.update_game = function(){
    gametime += deltaTime*conversion_time_to_gametime;
    this.updateWEU(deltaTime*conversion_time_to_gametime);
    mission.WES.update_power(game_scene); // update total power
    mission.WES.update_capital_energy_sale(deltaTime*conversion_time_to_gametime); // update capital by selling energy
    mission.WES.calculate_add_capital_cost(deltaTime*conversion_time_to_gametime);
    mission.WES.update_add_operational_costs(game_scene);
    mission.WES.update_public_acceptance(game_scene);
    // update_information_operations(game_scene,deltaTime*conversion_time_to_gametime); // update information board
    // update_score

    var monthgame = document.getElementById("monthvalue");
    monthgame.innerHTML = Math.floor((gametime/(24*30) -Math.floor(gametime/(24*30)/12)*12))+1 ;
    var powergame = document.getElementById("powervalue");
    powergame.innerHTML = mission.WES.power.toFixed(2) + "MW";
    var coegame = document.getElementById("coevalue");
    coegame.innerHTML = mission.WES.CoE + "&#8364" + "/MWh";
    var capitalgame = document.getElementById("capitalvalue");
    capitalgame.innerHTML = mission.WES.capital.toFixed(2) + "M" + "&#8364";
    var acceptancebargame = document.getElementById("acceptancevalue");
    acceptancebargame.style.width = 100*mission.WES.public_acceptance +"%";
    var valuet = Math.round(255*(1-Math.min(1,mission.WES.public_acceptance)));
    // acceptancebargame.style.backgroundColor = "rgb("+ valuet+ ",255,0)"; //"rgb(255,0,0)" ; //"#68c3c0";
    // acceptancebargame.style.backgroundColor
    if (mission.WES.public_acceptance>0.3) {
      acceptancebargame.style.backgroundColor = "rgb("+valuet+ ",255,0)";
    } else {
      acceptancebargame.style.backgroundColor= "rgb(255,"+valuet+ ",0)";
    }


    // update_clouds_scene(game_scene, deltaTime*conversion_time_to_gametime);
    // update_waves(game_scene, deltaTime*conversion_time_to_gametime,newTime*conversion_time_to_gametime);
    // update_windsock(game_scene, deltaTime*conversion_time_to_gametime)
    update_locationidentifiers(game_scene, deltaTime,newTime);
    this.renderer.render(this.scene, this.camera);
  };
  //////////////////////////////
  this.updateWEU = function(delTime){
    // update the wind energy units of the scene
      var nameobj;
      var test_is_windenergyunit;
      var wtunit;
      var rotorpointer;
      var nacellerotorpointer;
      var i;




      for (i = 0; i < this.scene.children.length; i++) {
        nameobj = this.scene.children[i].name;
        test_is_windenergyunit=nameobj.indexOf("windturbineunit");
        if(test_is_windenergyunit==0){

          wtunit=this.scene.children[i];
          wtunit.WEU.updateWEU(delTime);
          wtunit.WEU.updateWEU_geometry(wtunit, delTime);
        };

      };
  };

}; ////// end of mission


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


function create_landscape_OldPersia_level1(gameobject){
  // this function creates the landscape for the oldPersia level 1
  // var gameobject = new THREE.Object3D(); // define the object as a 3D object
  // gameobject.name ="landscape"; // name teh object so we can identfy it

  // define background colors of sky
  // 	background: linear-gradient(#e4e0ba, #f7d9aa);
  var worldpointer = document.getElementById("world");
  worldpointer.style.background =  'linear-gradient(to bottom, #336699, #336699)'; //'linear-gradient(#6BCAE2, #51A5BA)';

  // create floating landscape
  dimension = {x:2000, y:30, z:2000,
    npanelx:30, npanely:1, npanelz:30};
  randomness = { x:25, y:10, z:25 };
  var floatinglandscape= new create_floating_ocean_ground(dimension, randomness);
  floatinglandscape.name="terrain";
  gameobject.add(floatinglandscape);

  // add forest
  var ntrees_in_forest=60;
  var inputforest=[];
  for (var i = 0; i < ntrees_in_forest; i++) {
    var tree={typeof:0, scale:10, position: [10, 10]};
    tree.typeof= Math.floor(Math.random()*2.999)+1
    tree.scale = 10+15*Math.random();
    tree.position= [  500*(Math.random()-0.5), 500*(Math.random()-0.5)];
    inputforest.push(tree);
  };
  var tree={typeof:0, scale:10, position: [10, 10]};
  tree.typeof= 2;
  tree.scale = 20;
  tree.position= [  800 , -800];
  inputforest.push(tree);

 var forest = new create_forest(inputforest,gameobject);
  gameobject.add(forest);




 //
 var windturbine = new createPersianTurbineUnit();
 // intersect turbine with ground
 windturbine.position.set(0,50, -150)
 gameobject.add(windturbine);

 // locations for wind turbines
 var nscale =3;
 var locationWEU = [
   [20*nscale ,20*nscale],
   [20*nscale ,-20*nscale],
   [80*nscale ,40*nscale],
   [-80*nscale ,-40*nscale],
   [100*nscale ,-60*nscale],
   [80*nscale ,-100*nscale],
 ];



for (var i = 0; i < locationWEU.length; i++) {
  var loclocation = new createLocationIdentifier(i);
  var yloc = find_y_position(locationWEU[i][0],locationWEU[i][1],gameobject);
  loclocation.position.set(locationWEU[i][0], yloc ,locationWEU[i][1]);
  gameobject.add(loclocation);
}

////////////////////////////////////////////////////////

// for (var i = 0; i < 5; i++) {
//     var mountain= new createMountain();
//     mountain.position.set(1300-600*i,0,-1300);
//     gameobject.add(mountain);
// };
//
// for (var i = 1; i < 5; i++) {
//     var mountain= new createMountain();
//     mountain.position.set(1300,-30,-1300+600*i);
//     gameobject.add(mountain);
// };
//

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// creation of several farms


  var farm = new create_farm(30,30, 200, 200, floatinglandscape )
  gameobject.add(farm);

////////////////////////////////////////////////////////
  var towninput=[];
  var location_town = [300, -600];
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      towninput.push([ (i*(40+Math.random()*25) + location_town[0]) ,  (j*(45+Math.random()*20) + location_town[1]),  Math.random()*2*3.14    ]);
    };
  };

  for (var i = 0; i < towninput.length; i++) {
    var inputhouse=towninput[i];
    var pointhouse = pointintersectObject(gameobject, inputhouse[0],inputhouse[1],2000);
    var house= new createPersianHouseObj();
    house.position.set(pointhouse[0],pointhouse[1],pointhouse[2]);
    house.rotation.y = inputhouse[2];
    gameobject.add(house);
  };




//   var g1 = new THREE.Object3D(); // define the object as a 3D object
//   g1.name ="testobj"; // name teh object so we can identfy it
//
//   var geom = new THREE.BoxGeometry(100, 300, 100,
//      1, 1 , 1);
//
//   // geom.verticesNeedUpdate = true;
//   var mat =  new  THREE.MeshPhongMaterial({color:ColorsDesert1["color2"], shading:THREE.FlatShading}); // define material
//     // var mat =  new  THREE.MeshLambertMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material
//     var element = new THREE.Mesh(geom, mat); // create element
//
//   // element.rotation.y = -Math.PI/4.0;
//   element.castShadow = true; // define properties of the elements
//   element.receiveShadow = true; // receives shadow
// //  gameobject.add(element);  // add element

    // var mountain= new createMountain();
    // mountain.position.set(0,0,0);
    // gameobject.add(mountain);
    //
    // var pointhouse = pointintersectObject(gameobject, 0,0,2000);
    // console.log("value 1 " + pointhouse[0] + "  value 2 " + pointhouse[1])


};




function create_floating_ocean_ground(dimensions, randomness, colors){
  // creating a floating ocean or ground

  if (colors === undefined) {
    colors = {
      color1:0x85622A,
      color2:0xE6A644,
      color3:0xE18339,
      color4:0xB6571D,
      color5:0x8C3313
    };
  }


  if (dimensions == undefined) {
    dimension = {
      x:1000,
      y:30,
      z:1000,
      npanelx:30,
      npanely:1,
      npanelz:30,
    };
  };

  if (randomness == undefined) {
    randomness = {
      x:5,
      y:5,
      z:5
    };
  };


  var gameobject = new THREE.Object3D(); // define the object as a 3D object
  gameobject.name ="floating_ocean_ground"; // name teh object so we can identfy it

  var geom = new THREE.BoxGeometry(dimension.x, dimension.y, dimension.z,
     dimension.npanelx, dimension.npanely , dimension.npanelz);
  for (var i = 0; i < geom.vertices.length; i++) {
    var vertex = geom.vertices[i];
     vertex.x += Math.random() * randomness.x;
     vertex.y += Math.random() * randomness.y;
     vertex.z += Math.random() * randomness.z;
    //  vertex.y += 20*Math.sin(vertex.x/20*3.14*1+10);
    //  vertex.y += 10*Math.sign(vertex.x);
  };
//  geom.rotateY(-Math.PI/4.0);
  geom.computeFaceNormals();
  geom.computeVertexNormals();
  // geom.verticesNeedUpdate = true;
 var mat =  new  THREE.MeshPhongMaterial({color:colors["color2"], shading:THREE.FlatShading}); // define material
    // var mat =  new  THREE.MeshLambertMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material
    var element = new THREE.Mesh(geom, mat); // create element

  // element.rotation.y = -Math.PI/4.0;
  element.castShadow = true; // define properties of the elements
  element.receiveShadow = true; // receives shadow
  gameobject.add(element);  // add element

  // var geom = new THREE.BoxGeometry(5, 50, 5, 1, 1 , 1);
  // var mat =  new  THREE.MeshPhongMaterial({color:Colors["red"], shading:THREE.FlatShading}); // define material
  // var element = new THREE.Mesh(geom, mat); // create element
  //
  // gameobject.add(element);  // add element


  // var tree = new createTreeObj(4,2);
    // tree.position.set(50, 15 +50*Math.sin(50/100*3.14*1), -30);
    // gameobject.add(tree);  // add element

  // return the object as output of function
  return gameobject;

};
