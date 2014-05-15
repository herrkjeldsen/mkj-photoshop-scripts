/*
Marcus Kjeldsen 2014
Basic script to place all selected layers into grid based on initial position, scale and document dimensions.
*/



var orig_ruler_units = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

var doc = activeDocument;
var nLayers = doc.artLayers.length;

var baseResX = doc.width;
var baseResY = doc.height;
var imgResX = 0;
var imgResY = 0;
var gridRes = Math.floor(Math.sqrt(nLayers)) + 1;

var counter = 0;
for(var i = 0; i<gridRes; i++) {
    for(var j = 0; j<gridRes; j++) {
        if(counter < nLayers) {
            var l = doc.artLayers[counter];
            //alert("C: " + counter + " - Name: " + l.name);
            //moveLayerTo(l,baseResX*j,baseResY*i);
            l.translate(baseResX*j,baseResY*i);
            newResX = (j+1) * baseResX;
            imgResX = (newResX > imgResX) ? newResX : imgResX;
            counter++;
        } else {
            break;
        }
    }
    newResY = (i+1) * baseResY;
    imgResY = (newResY > imgResY) ? newResY : imgResY;
}


doc.resizeCanvas(imgResX, imgResY, AnchorPosition.TOPLEFT);
preferences.rulerUnits = orig_ruler_units;






// functions

function moveLayerTo(fLayer,fX,fY) {
  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];
  fLayer.translate(-Position[0],-Position[1]);
}
