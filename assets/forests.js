// assets with generic trees and forests


function create_forest(inputforest,sceneobject){

  var raycaster = new THREE.Raycaster();

  var forest = new THREE.Object3D(); // define the object as a 3D object
  forest.name ="forest"; // name teh object so we can identfy it

  // var error;
  // var x1=-50;
  // var z1=-20;
  for (var i = 0; i < inputforest.length; i++) {
    var tree = new createTreeObj(inputforest[i].typeof,inputforest[i].scale);
    // var tree = new createTreeObj(4,4);


    var downVector = new THREE.Vector3(0, -1, 0);
    var tempVector = new THREE.Vector3(inputforest[i].position[0], 500, inputforest[i].position[1]);
    // var tempVector = new THREE.Vector3(x1, 500, z1);
    raycaster.set(tempVector, downVector);
    var collisions = raycaster.intersectObject(sceneobject, true);
    if (collisions.length > 0) {
      // alert(i  +" "+  inputforest[i].position[0] +" "+ collisions[0].point.y +" "+ inputforest[i].position[1])
      tree.position.set(inputforest[i].position[0], collisions[0].point.y, inputforest[i].position[1]);
      // var tempVector = new THREE.Vector3(x1, collisions[0].point.y, z1);
      // var vec1=collisions[0].object.localToWorld( tempVector );
      // alert(vec1.x + " " + vec1.y + " " +vec1.z + " temp " + tempVector.x + " " + tempVector.y + " " +tempVector.z )

      // tree.position.set(vec1.x,vec1.y,vec1.z);
      // alert(collisions[0].point.y -  (15 + 150 + 50*Math.sin(inputforest[i].position[0]/1000*3.14*1)))
      // error= Math.max(0,Math.abs(collisions[0].point.y -  (15 + 150 + 50*Math.sin(inputforest[i].position[0]/1000*3.14*1))));

    forest.add(tree);
    // var temp;
    // temp = tree.getWorldPosition();
    // alert(collisions[0].point.y +"  "+ temp.x +"  "+ temp.y +"  "+ temp.z)

    }
  };
      // alert(error)

  return forest;

};
















function createTreeObj(typetree,scale) {
  // this function creates a Terrain
  // the input definition defines the Object
  //////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
  var found = new THREE.Object3D(); // define the object as having a 3D mesh
  found.name = "tree";


  if (typetree==1) {

    var geom1 = new THREE.CylinderGeometry(0.03,0.05,0.5,6); // define geometry
    var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["brown"], shading:THREE.FlatShading}); // define material
    var element = new THREE.Mesh(geom1, mat1); // create element
    element.castShadow = true; // define properties of the elements
    element.receiveShadow = true;
    element.position.set(0, 0.25,0);
    found.add(element);  ///
    geom1 = new THREE.DodecahedronGeometry(0.5); // define geometry
    mat1 =  new  THREE.MeshPhongMaterial({color:Colors["green"], shading:THREE.FlatShading}); // define material
    element = new THREE.Mesh(geom1, mat1); // create element
    element.castShadow = true; // define properties of the elements
    element.receiveShadow = true;
    element.rotation.set(Math.random()*3.15, Math.random()*3.15,Math.random()*3.15);
    element.position.set(0, 0.75,0);
    found.add(element);  ///
    found.scale.set(scale,scale,scale);

  };

  if (typetree==2) {

    var geom1 = new THREE.CylinderGeometry(0.04,0.05,0.5,6); // define geometry
    var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["brown"], shading:THREE.FlatShading}); // define material
    var element = new THREE.Mesh(geom1, mat1); // create element
    element.position.set(0, 0.25,0);
    element.castShadow = true; // define properties of the elements
    element.receiveShadow = true;
    found.add(element);  ///
    var geom1 = new THREE.CylinderGeometry(0.0001,0.2,0.7,6); // define geometry
    mat1 =  new  THREE.MeshPhongMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material
    element = new THREE.Mesh(geom1, mat1); // create element
    element.castShadow = true; // define properties of the elements
    element.receiveShadow = true;
    element.rotation.set(0,Math.random
      ()*3.15, 0);
      element.position.set(0, 0.7,0);
      found.add(element);  ///
      found.scale.set(scale,scale,scale);

    };

    if (typetree==3) {

      var geom1 = new THREE.CylinderGeometry(0.03,0.05,0.5,6); // define geometry
      var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["brown"], shading:THREE.FlatShading}); // define material
      var element = new THREE.Mesh(geom1, mat1); // create element
      element.castShadow = true; // define properties of the elements
      element.receiveShadow = true;
      element.position.set(0, 0.25,0);
      found.add(element);  ///
      geom1 = new THREE.DodecahedronGeometry(0.5); // define geometry
      // for (var i = 0; i < geom1.vertices.length; i++) {
      //   var vertex = geom1.vertices[i];
      //   vertex.z = vertex.z*(1+0.2*Math.random());
      // };
      // geom1.computeFaceNormals();
      // geom1.computeVertexNormals();
      // geom1.verticesNeedUpdate = true;
      mat1 =  new  THREE.MeshPhongMaterial({color:Colors["green"], shading:THREE.FlatShading}); // define material
      element = new THREE.Mesh(geom1, mat1); // create element
      element.castShadow = true; // define properties of the elements
      element.receiveShadow = true;
      element.rotation.set(Math.random()*3.15, Math.random()*3.15,Math.random()*3.15);
      element.position.set(0, 0.75,0);
      found.add(element);  ///
      found.scale.set(scale,scale,scale);

    };


    if (typetree==4) {

      geom1 = new THREE.DodecahedronGeometry(0.5); // define geometry
      mat1 =  new  THREE.MeshPhongMaterial({color:Colors["yellow"], shading:THREE.FlatShading}); // define material
      element = new THREE.Mesh(geom1, mat1); // create element
      element.castShadow = true; // define properties of the elements
      element.receiveShadow = true;
      // element.rotation.set(Math.random()*3.15, Math.random()*3.15,Math.random()*3.15);
      element.position.set(0, 0.,0);
      found.add(element);  ///
      found.scale.set(scale,scale,scale);

    };



    return found ;


  };
