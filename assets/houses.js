/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


function createHouseObj(definition){

  if (definition==undefined) {
      definition = [20,10,8];
  };

	// creates a house
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
  found.name = "House";
	var geom1 = new THREE.BoxGeometry(1.01,1.,1); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["white"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.position.set(0, 0.5,0);
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	found.add(element);  ///
	var geom1 = new THREE.BoxGeometry(1,1/Math.SQRT2,1/Math.SQRT2); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["red"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	element.rotation.set(Math.PI/4,0,0);
	element.position.set(0, 1,0);
	found.add(element);  ///
	found.scale.set(definition[0],definition[1],definition[2]);
	return found ;
};



function createPersianHouseObj(definition,colors){

  if (definition==undefined) {
      definition = [20,10,8];
  };


  if (colors==undefined) {
      colors = {
        color1:0x85622A,
        color2:0xE6A644,
        color3:0xE18339,
        color4:0xB6571D,
        color5:0x8C3313
      };
  };


	// creates a house
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
  found.name = "House";
	var geom1 = new THREE.BoxGeometry(1.01,1.,1); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:colors["color2"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.position.set(0, 0.5,0);
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	found.add(element);  ///

  // create roof
	var geom1 = new THREE.BoxGeometry(1.05,0.1,1.05); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:colors["color1"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	// element.rotation.set(Math.PI/4,0,0);
	element.position.set(0, 1,0);
  found.add(element);  ///

  // create roof
	var geom1 = new THREE.BoxGeometry(1.5,0.15,1.5); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:colors["color3"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	// element.rotation.set(Math.PI/4,0,0);
	element.position.set(0, 0,0);
  found.add(element);  ///








	found.scale.set(definition[0],definition[1],definition[2]);
	return found ;
};
