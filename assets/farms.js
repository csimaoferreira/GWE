//////////////////////////////////////////////////////////////////
//// farms and otehr assets



function create_farm(xloc,zloc, width, depth, terrainobj){
  // this function creates a Terrain
  // the input definition defines the Object
  //////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
  var found = new THREE.Object3D(); // define the object as having a 3D mesh
  found.name = "farm";

  var geom1 = new THREE.BoxGeometry(width,5,depth,20,1,20); // define geometry
  //geom1.rotateY(-Math.PI/4.0);
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["red"], vertexColors: THREE.FaceColors,shading:THREE.FlatShading}); // define material

	var element = new THREE.Mesh(geom1, mat1); // create element
  element.receiveShadow = true;
  for (var i = 0; i < geom1.faces.length; i++) {
    var face1= geom1.faces[i];
  //    face1.color =new THREE.Color( 0x44dd66 );
    face1.color.setRGB(0,0.5+0.5*Math.random(),0.5*Math.random());
    geom1.colorsNeedUpdate = true;
  };
  geom1.colors.colorsNeedUpdate = true;
  geom1.colorsNeedUpdate = true;
  // deform farm land to match landscape
  var raycaster = new THREE.Raycaster();

  var downVector = new THREE.Vector3(0, -1, 0);

  for (var i = 0; i < geom1.vertices.length; i++) {
     var vertex = geom1.vertices[i];
     var tempVector = new THREE.Vector3(vertex.x, 500, vertex.z);

     raycaster.set(tempVector, downVector);
     var collisions = raycaster.intersectObject(terrainobj, true);
     if (collisions.length > 0) {
       // alert(i  +" "+  inputforest[i].position[0] +" "+ collisions[0].point.y +" "+ inputforest[i].position[1])
       vertex.y += collisions[0].point.y;

     }


   };




  geom1.computeFaceNormals();
  geom1.computeVertexNormals();
  geom1.verticesNeedUpdate = true;

//	element.position.set(xloc,100,zloc);

  // set farm terrain in ground



	found.add(element);  ///
	return found ;





  // return the object as output of function
  // return gameobject;

};
