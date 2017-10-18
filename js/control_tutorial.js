//// control for tutorial section


function gotofirstslidepresentation(){

  var localindices = Reveal.getIndices( document.getElementById( "tutorial_title_slide" ) );
  Reveal.slide( localindices.h, localindices.v );

};

function gotoTOCslidepresentation(){

  var localindices = Reveal.getIndices( document.getElementById( "tutorial_title_slide" ) );
  Reveal.slide( localindices.h, localindices.v );

};

function exitslidepresentation(){

  gotofirstslidepresentation(); // bring presentation to fisrt slide
  var   localcontainer = document.getElementById("tutorial_frame");
    localcontainer.style.display= "none";


};



function openslidepresentation(){

  gotofirstslidepresentation(); // bring presentation to fisrt slide
  var   localcontainer = document.getElementById("tutorial_frame");
    localcontainer.style.display= "inline";
  gotofirstslidepresentation(); // bring presentation to fisrt slide


};
