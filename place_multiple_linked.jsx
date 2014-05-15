/*
    Marcus Kjeldsen 2014
    Basic Photoshop script to place all images in a folder as linked smart objects.
    
    // TODO :: make recursive
*/


var theFolder = Folder.selectDialog ("select folder");

if (theFolder) {
    var theFiles = theFolder.getFiles(/\.(jpg|tif|eps|psd|png)$/i); // regex for filetypes
    
    // place the files
    for (var i = 0; i < theFiles.length; i++) { 
        var file = theFiles[i];
        
        // scriptlistener crap
        var idPlc = charIDToTypeID( "Plc " );
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
        desc3.putPath( idnull, new File( file ) ); // path inserts here
        var idLnkd = charIDToTypeID( "Lnkd" );
        desc3.putBoolean( idLnkd, true );
        var idFTcs = charIDToTypeID( "FTcs" );
        var idQCSt = charIDToTypeID( "QCSt" );
        var idQcsa = charIDToTypeID( "Qcsa" );
        desc3.putEnumerated( idFTcs, idQCSt, idQcsa );
        var idOfst = charIDToTypeID( "Ofst" );
            var desc4 = new ActionDescriptor();
            var idHrzn = charIDToTypeID( "Hrzn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc4.putUnitDouble( idHrzn, idPxl, 0.000000 );
            var idVrtc = charIDToTypeID( "Vrtc" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc4.putUnitDouble( idVrtc, idPxl, 0.000000 );
        var idOfst = charIDToTypeID( "Ofst" );
        desc3.putObject( idOfst, idOfst, desc4 );
        
        executeAction( idPlc, desc3, DialogModes.NO );
    }
};

