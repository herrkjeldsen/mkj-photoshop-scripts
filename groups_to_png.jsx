#target photoshop

/*
	Loops recursively through all layer groups, trims them and exports them as separate pngs.
	Layers that should not be exported should not be visible, including root level layers, as this script only deals with layer groups.
	
	WARNING: There is no error catching, and files with identical group names will be overwritten
	
	
	By Marcus Kjeldsen, 2013
	
	*/

// TODO :: more checks, more efficient, dialogue box (report, filename check, instructions, abort)

var doc = activeDocument;
var oldPath = activeDocument.path;
var exportfolder = Folder(oldPath + "/exports");
if(!exportfolder.exists) exportfolder.create();


function recurse(lay) {
	var layers = lay.layerSets;
	for(var i=0; i < layers.length; i++) {
		if(layers[i].name.charAt(0) != "_") {
			activeDocument.activeLayer = layers[i];
			exportGroup(layers[i]);
		}
		recurse(layers[i]);
    }
}



function exportGroup(lay) {
	var newDoc = doc.duplicate(lay.name,false);// dupe with new name and as flattened doc.
	var layer = activeDocument.activeLayer;
	
	layer.move(newDoc, ElementPlacement.PLACEATBEGINNING);
	
	var layers = activeDocument.layerSets;
	for(var i=0; i < layers.length; i++) {
		if(layers[i] != layer) {
			layers[i].visible = false;
		}
    }

	activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
	
	var saveFile= File(exportfolder + "/" + lay.name + ".png");
	savePNG(saveFile);
	activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}




function savePNG(saveFile){
    var pngOpts = new ExportOptionsSaveForWeb; 
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = false; 
    pngOpts.quality = 100;
    activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts); 
}

if(documents.length) recurse(doc);


