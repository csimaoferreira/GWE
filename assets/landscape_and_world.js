// function to create landscape

function createLandscapeworld_A(locscene,wtdefinition) {
	// this function creates a full wind energy unit, including foundation
	// the input wtdefinition defines the turbine
	/////////////////////////////////////////////////////////////////////////////////alert("test 2" + wtdefinition)
	var i, j;
	var xo=-200;
	var yo= 220;

	var nlocationWEU = 5;
	var nlocationhouses = 10;
	var nlocationOBjc = 220;
	var nclouds = 30;
	var nlocgrid = 55;
	var dxgrid = 400/nlocgrid;
	var mlocgrid = 50;
	var dzgrid = 400/mlocgrid;
	var loclocation;
	var temp1, temp2, temp3, temp4, temp5, temp6, temp7;
	// create locations for objects
	var index_location = [] ;
	var index_locationWEU = [] ;
	var xpos = [] ;
	var zpos = [] ;
	var xposWEU = [] ;
	var zposWEU = [] ;
	var xposhouse = [] ;
	var zposhouse = [] ;


	// create clouds
	for ( i = 0; i < nclouds; i++) {
		for ( j = 0; i < nclouds; i++) {
			temp1 = new createClouds();
			temp1.position.set(2000*(Math.random()-0.50),300+200*(Math.random()-0.50),2000*(Math.random()-0.50) )
			//  temp1.position.set(50*(Math.random()-0.50),40+20*(Math.random()-0.50),90*(Math.random()-0.50) )

			locscene.add(temp1);
		};
	};

	index_location.push(Math.floor((Math.random() * nlocgrid*mlocgrid) + 1));
	for (i = 0; i < nlocationOBjc; i++) {
		temp1=Math.floor((Math.random() * nlocgrid*mlocgrid) + 1);
		if (index_location.indexOf(temp1)==-1) {index_location.push(temp1);	};
	};

	for (i = 0; i < index_location.length; i++) {
		temp1 =Math.floor(index_location[i]/nlocgrid);
		temp2 =(index_location[i]-Math.floor(index_location[i]/nlocgrid)*nlocgrid);
		xpos.push( (xo + (temp2*dxgrid  + ((Math.random() -0.5 )* 10)))*(1+1.0*(temp1)/mlocgrid)); //*(1+(temp1)/5) );

		zpos.push( -1*temp1*dzgrid + yo + ((Math.random() -0.5 )* 10) );

		// document.write("<p> xpos zpos "  + i + " " + xpos[i] +"   " + zpos[i] + " </p>")

	};

	// define the location of the WEU
	xposWEU.push(xpos[0]);
	zposWEU.push(zpos[0]);
	index_locationWEU.push(index_location[0]);
	temp6=[];
	temp6.push(0);

	//  temp1 = index_location.sort(); // sort indices
	for (i = 1; i < index_location.length; i++) {
		temp1 =Math.floor(index_location[i]/10);
		temp2 =(index_location[i]-Math.floor(index_location[i]/10)*10);

		temp5=true;
		for (j = 0; i < xposWEU.length; j++) {
			temp3 =Math.floor(index_locationWEU[i]/10);
			temp4 =(index_locationWEU[i]-Math.floor(index_locationWEU[i]/10)*10);
			if((Math.abs(temp1-temp3)+Math.abs(temp2-temp4))<7){temp5=false;};
		}

		if (temp5) {
			xposWEU.push(xpos[i]);
			zposWEU.push(zpos[i]);
			temp6.push(i);
		} ;

		if (xposWEU.length>(nlocationWEU-1)) {
			i=index_location.length;
		} ;
	}

	temp6.sort();
	temp6.reverse();
	for ( i = 0; i < temp6.length; i++) {
		xpos.splice(temp6[i],1);
		zpos.splice(temp6[i],1);
	};


	//	var LANDSCAPE = new THREE.Object3D(); // define the object as 3D
	//	LANDSCAPE.name="landscape";

	// add wind socket
	var windsocket = new createWindSockObj();
	windsocket.position.set(100, 0, 200);
	locscene.add(windsocket);
	// create locations for WEU

	//
	for (i = 0; i < nlocationWEU; i++) {
		loclocation = new createLocationIdentifier(i);
		loclocation.position.set( xposWEU[i], 0 ,zposWEU[i])
		locscene.add(loclocation);
	}




	// create terrain
	var terrain = createTerrainIslandObj(wtdefinition.terrain);
	locscene.add(terrain);
	var waves = createWaveOceanObj(wtdefinition.terrain);
	locscene.add(waves);


	// crete trees
	for (i = 0; i < xpos.length; i++) {
		var tree = createTreeObj(Math.round(Math.random()+1), 15+10*Math.random());
		tree.position.set(xpos[i], 0,zpos[i]);
		locscene.add(tree);
	}

	// var tree = createTreeObj(1,25);
	// tree.position.set(40, 0,0);
	// locscene.add(tree);
	//
	// var tree = createTreeObj(2,40);
	// tree.position.set(10, 0, -30);
	// locscene.add(tree);

	// var house=createHouseObj([20,10,8]);
	// house.position.set(-30, 0, 10);
	// house.rotation.y =Math.PI/3;
	// locscene.add(house);

	// return full design
	// return locscene;
};







function createClouds(){

	var found = new THREE.Object3D(); // define the object as 3D
	found.name="cloud";
	var geom1;
	var mat1;
	var element;
	var i;
	for (i = 0; i < 5; i++) {


		geom1 = new THREE.BoxGeometry(0.5+Math.random(),0.5+Math.random(),0.5+Math.random(),1,1,1); // define geometry
		mat1 =  new  THREE.MeshBasicMaterial({color:Colors["white"], transparent: true, opacity: 0.7}); // define material
		element = new THREE.Mesh(geom1, mat1); // create element
		element.castShadow = true; // define properties of the elements
		element.receiveShadow = false;
		element.position.set(Math.random()*i-2, Math.random()*0.7,Math.random()-0.5);
		element.rotation.set(Math.random()*2*3.14, Math.random()*2*3.14,Math.random()*2*3.14);
		found.add(element);  ///
	}

	found.scale.set(50+20*Math.random(),10*Math.random(),80+30*Math.random());
	return found;
};


////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
function createLandscapeWorld(locscene,wtdefinition) {
	/////////////////////////////////////////////////////////////////////////////////alert("test 2" + wtdefinition)

	// var locscene = new THREE.Object3D(); // define the object as 3D
	// locscene.name="locscene";
	var nclouds =10;
	var temp1;
	// create clouds
	for ( i = 0; i < nclouds; i++) {
		for ( j = 0; i < nclouds; i++) {
			temp1 = new createClouds();
			temp1.position.set(800*(Math.random()-0.50),400+200*(Math.random()-0.50),1800*(Math.random()-0.50) )
			//  temp1.position.set(50*(Math.random()-0.50),40+20*(Math.random()-0.50),90*(Math.random()-0.50) )

			locscene.add(temp1);
		};
	};



	// add wind socket
	var windsocket = new createWindSockObj();
	windsocket.position.set(-20, 0, 150);
	windsocket.scale.set(2, 2, 2);
	locscene.add(windsocket);


	// create terrain
	var terrain = createTerrainObj(wtdefinition.terrain);
	locscene.add(terrain);


	// create terrain
	var tree = createTreeObj(1,25);
	tree.position.set(40, 0,0);
	locscene.add(tree);

	var tree = createTreeObj(2,40);
	tree.position.set(10, 0, -30);
	locscene.add(tree);

	var house=createHouseObj([20,10,8]);
	house.position.set(-30, 0, 10);
	house.rotation.y =Math.PI/3;
	locscene.add(house);


	// return full design
	// return locscene;
};

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function createTerrainObj(definition) {
	// this function creates a Terrain
	// the input definition defines the Object
	//////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
	found.name = "terrain";
	var geom1 = new THREE.PlaneGeometry(definition[1],definition[2],definition[3],definition[4]); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors[definition[5]], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	element.rotation.x = -Math.PI/2.;
	//	element.position.set(definition[1],definition[2],definition[3]);
	found.add(element);  ///
	return found ;


};
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


function createWaveOceanObj(definition) {
	// this function creates a Terrain
	// the input definition defines the Object
	//////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
	found.name = "waveocean";
	//		var geom1 = new THREE.PlaneGeometry(definition[1],definition[2],definition[3],definition[4]); // define geometry
	var geom1 = new THREE.PlaneGeometry(1000,1000,40,40); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material

	//		var xtemp, ytemp, rtemp, dtemp;
	var index = 0;
	for(var i=0; i < geom1.vertices.length; i++) {
		//			for(var j=0; j < 100 + 1; j++) {

		// xtemp=geom1.vertices[index].x;
		// ytemp=geom1.vertices[index].y-50;
		// rtemp=xtemp*xtemp+ytemp*ytemp;
		// dtemp=400*400*(1+0.1*Math.random());
		// if(rtemp>(dtemp)){
		geom1.vertices[i].z = 7*(Math.random()-0.5);

		// }

		// geom1.vertices[index].z = 4*Math.random();

		// index++;
		// }
	}


	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	element.rotation.x = -Math.PI/2.;
	element.position.set(0,-5,100);
	found.add(element);  ///
	found.pointer_geom_wave = geom1;


	return found ;


};

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function createTerrainIslandObj(definition) {
	// this function creates a Terrain
	// the input definition defines the Object
	//////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
	found.name = "terrain";
	//		var geom1 = new THREE.PlaneGeometry(definition[1],definition[2],definition[3],definition[4]); // define geometry
	var geom1 = new THREE.PlaneGeometry(900,900,100,100); // define geometry

	var xtemp, ytemp, rtemp, dtemp;
	var index = 0;
	for(var i=0; i < 100 + 1; i++) {
		for(var j=0; j < 100 + 1; j++) {

			xtemp=geom1.vertices[index].x;
			ytemp=geom1.vertices[index].y-50;
			rtemp=xtemp*xtemp+ytemp*ytemp;
			dtemp=400*400*(1+0.1*Math.random());
			if(rtemp>(dtemp)){
				geom1.vertices[index].z = (rtemp-(dtemp))*(-0.4) + 0*Math.random();

			}

			// geom1.vertices[index].z = 4*Math.random();

			index++;
		}
	}

	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors[definition[5]], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	element.rotation.x = -Math.PI/2.;
	//	element.position.set(definition[1],definition[2],definition[3]);
	found.add(element);  ///


	var geom1 = new THREE.PlaneGeometry(definition[1],definition[2],definition[3],definition[4]); // define geometry
	var mat1 =  new  THREE.MeshPhongMaterial({color:Colors["blue"], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = true;
	element.rotation.x = -Math.PI/2.;
	element.position.set(0,-5,0);
	found.add(element);  ///



	return found ;


};
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////








////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function createWindSockObj(definition){
	// creates a house
	var found1 = new THREE.Object3D(); // define the object as 3D
	var found2 = new THREE.Object3D(); // define the object as 3D
	var found = new THREE.Object3D(); // define the object as 3D
	found1.name="windsock_tubesock";
	found2.name="windsock_pole";
	found.name="windsock";
	var loccol = [Colors["red"] , Colors["white"]];
	var geom1;
	var mat1;
	var element;
	var i;
	for (i = 0; i < 5; i++) {

		geom1 = new THREE.CylinderGeometry(0.9,1,1,8,1); // define geometry

		mat1 =  new  THREE.MeshBasicMaterial({color:loccol[ i - 2*Math.floor(i/2)    ], transparent: true, opacity: 0.7}); // define material
		element = new THREE.Mesh(geom1, mat1); // create element
		element.castShadow = true; // define properties of the elements
		element.receiveShadow = false;
		element.position.set(0, 0.5+i*1,0);
		element.scale.set(1-0.1*i,1,1-0.1*i);

		// element.rotation.set(Math.random()*2*3.14, Math.random()*2*3.14,Math.random()*2*3.14);
		found1.add(element);  ///
	}

	found1.scale.set(0.8, 1,0.8);
	found1.rotation.z= - Math.PI/2;
	found1.position.set(0., 10 , 0.);
	found.add(found1);

	geom1 = new THREE.CylinderGeometry(1,1,1,5,1); // define geometry

	mat1 =  new  THREE.MeshBasicMaterial({color:loccol[0]}); // define material
	element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = true; // define properties of the elements
	element.receiveShadow = false;
	element.position.set(0, 5,0);
	element.scale.set(0.25,10, 0.25);
	found2.add(element);  ///

	found.add(found2);
	return found;
};

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////




function pointintersectObject(object, x,z,y, vector){

  if (y == undefined) {
  	y=500;
  };

	if (vector == undefined) {
    var vector = new THREE.Vector3(0, -1, 0);
	};

	var raycaster = new THREE.Raycaster();



    var temppos = new THREE.Vector3(x, y, z);
    // var tempVector = new THREE.Vector3(x1, 500, z1);
    raycaster.set(temppos, vector);
    var collisions = raycaster.intersectObject(object, true);
    if (collisions.length > 0) {
			var point = [collisions[0].point.x, collisions[0].point.y, collisions[0].point.z];
    };
      // alert(error)
  	return point;

};




function pointintersectObjectv2(object, x,z,y, vector){

  if (y == undefined) {
  	y=500;
  };

	if (vector == undefined) {
    var vector = new THREE.Vector3(0, -1, 0);
	};

	var raycaster = new THREE.Raycaster();



    var temppos = new THREE.Vector3(x, y, z);
    // var tempVector = new THREE.Vector3(x1, 500, z1);
    raycaster.set(temppos, vector);
    var collisions = raycaster.intersectObject(object, true);
    if (collisions.length > 0) {
			console.log("length of collisions" + collisions.length);


			var point = [collisions[0].point.x, collisions[0].point.y, collisions[0].point.z];
    };
      // alert(error)
  	return point;

};
