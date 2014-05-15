#target photoshop
/*
Marcus Kjeldsen 2014
Basic script to resize file based on filename using syntax 555x5555_filename.jpg
*/

var doc = activeDocument;

// get filesize from filename
var nom = doc.name;
var sizeEnd = nom.indexOf("_");
var sizeStr = nom.substring(0,sizeEnd);
var sizeDivider = nom.indexOf("x");
var xSize = parseInt(sizeStr.substring(0,sizeDivider));
var ySize = parseInt(sizeStr.substring(sizeDivider+1, sizeEnd));

doc.resizeImage(xSize, ySize, 72, ResampleMethod.BICUBIC);