function findProperties(curItem) {
    var curLayer = curItem.selectedLayers[0];
    var report = "";
    report = recursive_name_alert(curLayer, report);
    $.writeln(report);
    return
}
 
function recursive_name_alert(property, report) {
    // recursively checks layer for properties
    // initially receives a layer....then receives indexed or named groups.
   
    var propTypeString = "Unknown";
    if (property.propertyType == PropertyType.INDEXED_GROUP) { propTypeString = "INDEXED_GROUP"; }
    else if (property.propertyType == PropertyType.NAMED_GROUP) { propTypeString = "NAMED_GROUP"; }
    else if (property.propertyType == PropertyType.PROPERTY) { propTypeString = "PROPERTY";  }
 
    var padding = "";
    for (var k = 0; k < property.propertyDepth; ++k) { padding += "   "; }
 
    report += padding + "(" + property.propertyDepth + ") " + property.name + "\r" + padding + propTypeString + ": " + property.matchName;
   
    if (property.propertyType == PropertyType.PROPERTY && property.canVaryOverTime && property.numKeys > 0) report += "\r" + padding + "HAS KEYS!!!!";
    report += "\r\r";
 
    // if current property is an Indexed or Named Group....
    if (property.propertyType == PropertyType.INDEXED_GROUP || property.propertyType == PropertyType.NAMED_GROUP) {
        // ....recursively loop through its properties
        for (var d = 1; d <= property.numProperties; d++) {
        report = recursive_name_alert(property.property(d), report);
        }
    }
return(report)
}
 
 
 
 
//  make sure a comp is selected
var activeItem = app.project.activeItem;
if (activeItem == null || !(activeItem instanceof CompItem)) {
    alert("Select a layer first.");
} else {
    // make sure at least one layer is selected
    if (activeItem.selectedLayers.length == 0 ) {
        alert("Select a layer first.");
    } else {
        findProperties(activeItem);
    }
}
