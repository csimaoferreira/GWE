////////////////////////////////////




function createLocationIdentifier(nind, scene) {
	// this function creates a  Tower
	// the input definition defines the Object
	//////////////////////////////////////////////////////////////////////////////////////////////////alert("test 3" + definition)
	var found = new THREE.Object3D(); // define the object as having a 3D mesh
	found.name = ("LocationIdentifier " + nind);
	found.location_type = "Forest";
	found.location_wind =10.1;
	var geom1 = new THREE.CylinderGeometry(1, 1, 3 ,8,1); // define geometry
	//	var geom1 = new THREE.CylinderGeometry(definition[4],definition[5],definition[6],10); // define geometry
	var mat1 = new THREE.MeshBasicMaterial( { color:Colors["red"], transparent: true, opacity: 0.7 } );
	//  THREE.MeshPhongMaterial({color:Colors[blue], shading:THREE.FlatShading}); // define material
	var element = new THREE.Mesh(geom1, mat1); // create element
	element.castShadow = false; // define properties of the elements
	element.receiveShadow = false;
	element.position.set(0,0.5,0);
	//	element.position.set(0,0,0)
	found.add(element);  ///
	found.scale.set(8,20,8)

	// create field to define if location active or notes
	found.location_active = false;
	found.location_built = false;
	found.location_activate = function(inputval){

		if (!this.location_built) {
			if (inputval) {
				this.location_active = true;
				// var mat1 = new THREE.MeshBasicMaterial( { color:Colors["blue"], transparent: true, opacity: 0.7 } );
				this.scale.set(8,20,8);
				this.children[0].material.color.set(Colors["blue"]);
				this.children[0].material.opacity=([0.5]);
			} else {
				this.location_active = false;
				this.scale.set(8,20,8);
				// var mat1 = new THREE.MeshBasicMaterial( { color:Colors["blue"], transparent: true, opacity: 0.7 } );
				this.children[0].material.color.set(Colors["red"]);
				this.children[0].material.opacity=([0.5]);

			};
		} else {
			this.location_active = inputval;
			this.scale.set(8,40,8);
			this.children[0].material.opacity=([0.01]);

		};
	};


	return found ;

};


function selectLocationMouse(event){
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var testfoundobj;
	var i;
	var intersects
	var location_object
	var nameofobject

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


	if(WEGMode.Game){

		// // update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, game_camera );
		intersects = raycaster.intersectObjects( game_scene.children, true );

		//

		// var nametemp = [];
		// var nametemp2 = [];
		//document.getElementById("message1").innerHTML = "no pick";
		for ( var i = 0; i < intersects.length; i++ ) {


			nameofobject = intersects[ i ].object.parent.name;
			// nametemp = nametemp + " " + nameofobject;
			//   document.getElementById("message1").innerHTML = nameofobject;
			//document.getElementById("message1").innerHTML = "turbine";
			// testfoundobj = nameofobject.indexOf("LocationIdentifier");

			// nametemp2 = nametemp2 + " " + testfoundobj;
			// document.getElementById("TUDelftMOOC").innerHTML = nametemp + " "+ nametemp2;

			if (nameofobject.indexOf("LocationIdentifier")==0) {
				// document.getElementById("TUDelftMOOC").innerHTML = nameofobject;
				location_object = intersects[ i ].object.parent;
				activate_deactivate_location(game_scene,"all",false)
				location_object.location_activate(true);
				i=10000000000; // leave cycle, take closest object
			};
			//

			// 	// document.getElementById("TUDelftMOOC").innerHTML = nameofobject;
			// 	location_object = intersects[ i ].object.parent;
			// 	activate_deactivate_location(game_scene,"all",false)
			// 	location_object.location_activate(true);
			// 	i=10000000000; // leave cycle, take closest object
			//
			// };




		} ;
	};
};
//	intersects[ i ].object.material.color.set( 0xff0100 );


// function to change active location
function activate_deactivate_location(scene,input,activateflag){

	var testfoundobj;
	var i;
	var intersects
	var location_object
	var nameofobject


	if (input=="all") {
		// make all location active
		for (i = 0; i < scene.children.length; i++) {
			testfoundobj = scene.children[i].name.indexOf("LocationIdentifier");
			// nametemp2 = nametemp2 + " " + testfoundobj;
			// document.getElementById("TUDelftMOOC").innerHTML = nametemp + " "+ nametemp2;

			if (testfoundobj==0) {
				// document.getElementById("TUDelftMOOC").innerHTML = nameofobject;
				location_object = scene.children[ i ];
				location_object.location_activate(activateflag);
			};

		}

	}


	if (input=="one") {
		// make all location active
		for (i = 0; i < scene.children.length; i++) {
			testfoundobj = scene.children[i].name.indexOf("LocationIdentifier");
			// nametemp2 = nametemp2 + " " + testfoundobj;
			// document.getElementById("TUDelftMOOC").innerHTML = nametemp + " "+ nametemp2;

			if (testfoundobj==0) {
				// document.getElementById("TUDelftMOOC").innerHTML = nameofobject;
				location_object = scene.children[ i ];
			};

		}
		location_object.location_activate(activateflag);
	};

};


// function to change active location
function identify_active_location(scene){

	var testfoundobj;
	var i;
	var active_locations=[];


	for (i = 0; i < scene.children.length; i++) {
		testfoundobj = scene.children[i].name.indexOf("LocationIdentifier");
		if (testfoundobj==0) {
			if (scene.children[i].location_active) {
				active_locations.push(scene.children[i]);
			}
		};
	};
	return active_locations;
};




function find_y_position(x,z,sceneobject,yreference){
	if (yreference==undefined) {yreference = 500;	};
	var raycaster = new THREE.Raycaster();
	var downVector = new THREE.Vector3(0, -1, 0);
	var tempVector = new THREE.Vector3(x, yreference, z);
	var output = undefined;
	// var tempVector = new THREE.Vector3(x1, 500, z1);
	raycaster.set(tempVector, downVector);
	var collisions = raycaster.intersectObject(sceneobject, true);
	if (collisions.length > 0) {output=collisions[0].point.y};
	return output;
};
