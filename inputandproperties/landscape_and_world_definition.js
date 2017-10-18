// input parameters to generate landscape and worlds





var terrain_input_array = [];
// definition - type, width, depth, nelem width, numelem depth, color
terrain_input_array.push(["type" , 20000, 20000 , 1, 1, "white"]);

var trees_input_array = [];
// definition - type, width, depth, nelem width, numelem depth, color
trees_input_array.push(["type", 20, 0, 0 , 5, 15  , 0.4, 5, "brown","green"]);
trees_input_array.push(["type", 20, 0, 0  , 10, 30  , 0.6, 15, "brown","red"]);



var landscape_definition = []
    landscape_definition = landscape_design([1 , 1 , 1, 1, 1, 3, 1, 1 , 1 ]);



function landscape_design(definition_design){
// input: index foundation, tower, nacelle, rotor, blades
  var design = {terrain:100};
  design.terrain = terrain_input_array[(definition_design[0]-1)];

 // return design
 return design;
};
