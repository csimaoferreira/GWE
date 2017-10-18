

function createMountain(dimensions, randomness){
  // creating a floating ocean or ground

  if (dimensions == undefined) {
    dimension = {
      x:1500,
      y:1500,
      z:1500,
      npanelx:30,
      npanely:1,
      npanelz:30,
    };
  };

  if (randomness == undefined) {
    randomness = {
      x:50,
      y:100,
      z:50
    };
  };


  var gameobject = new THREE.Object3D(); // define the object as a 3D object
  gameobject.name ="mountain"; // name teh object so we can identfy it

 // define random wave genrators
 var randomseeds = [];
 for (var i = 0; i < 5; i++) {
   randomseeds.push([Math.random() , Math.random(), Math.random() , Math.random(), Math.random() , Math.random() ])
 }


 var geom = new THREE.BoxGeometry(1, .2, 1,
   dimension.npanelx, dimension.npanely , dimension.npanelz);
   for (var j = 0; j < 5; j++) {
     for (var i = 0; i < geom.vertices.length; i++) {
       var vertex = geom.vertices[i];
       var seeds = randomseeds[j];
       vertex.y += 1/5/((1+j*0.1))*Math.abs(seeds[2]*Math.sin(vertex.x*3.14*3*seeds[0]+3.14*seeds[1]) + seeds[5]*Math.sin(vertex.z*3.14*3*seeds[3]+3.14*seeds[4]) )*Math.sign(vertex.y);
       var temp = Math.pow(Math.abs(Math.cos(vertex.x*3.14)*Math.cos(vertex.z*3.14)),1.6);
       vertex.y = vertex.y*temp;

       //     vertex.x += 1*dimension.x+Math.random() * randomness.x;
        // vertex.y += Math.random() * randomness.y;
       //     vertex.z += 1*dimension.z+Math.random() * randomness.z;
       //  vertex.y += 10*Math.sign(vertex.x);
     };
   };


//  geom.rotateY(-Math.PI/4.0);
  geom.computeFaceNormals();
  geom.computeVertexNormals();
  // geom.verticesNeedUpdate = true;
 var mat =  new  THREE.MeshPhongMaterial({color:ColorsDesert1["color1"], shading:THREE.FlatShading}); // define material
    // var mat =  new  THREE.MeshLambertMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material
    var element = new THREE.Mesh(geom, mat); // create element

  // element.rotation.y = -Math.PI/4.0;
  element.castShadow = true; // define properties of the elements
  element.receiveShadow = true; // receives shadow
	element.scale.set(dimension.x, dimension.y , dimension.z);
  gameobject.add(element);  // add element


  // return the object as output of function
  return gameobject;


};
