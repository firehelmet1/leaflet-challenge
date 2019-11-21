// Create a map object
var myMap = L.map("map", {
  center: [38.4667, -28.4000],
  zoom: 2
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: "pk.eyJ1IjoiZmlyZWhlbG1ldCIsImEiOiJjazJwajJodnAwNHNsM29xdmp6eTZ3NDQxIn0.0r3S-gjiJo_ThxgAZtnA_g"
}).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL

d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(features) {
 console.log(features)

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  features.forEach(feature => {
     
   // console.log(feature)
    var coord = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
    
    // Color-code by magnitude

    if (feature.properties.mag > 5) {
      var color = "maroon"
    } 
    else if (feature.properties.mag >= 4 && feature.properties.mag <=5) {
      var color = "red"
    } 
    else if (feature.properties.mag >= 3 && feature.properties.mag <=4) {
      var color = "orange"
    }
    else if (feature.properties.mag >= 2 && feature.properties.mag <=3) {
      var color = "yellow"
    }
    else if (feature.properties.mag >= 1 && feature.properties.mag <=2) {
      var color = "#9acd32"
    }
    else {
      var color = "green"
    }
      /// test section
      L.circle(coord, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: (50000*feature.properties.mag)
      }).bindPopup("<h5> Magnitude: " + feature.properties.mag + "</h5> <hr> <h7> Location: " +feature.properties.place+ 
      "</h7> <hr> <p>" + new Date(feature.properties.time) + "</p>").addTo(myMap);
  /// test section
});

/*Legend specific*/
var legend = L.control({ position: "bottomleft" })

legend.onAdd = function(myMap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Magnitude</h4>";
  div.innerHTML += '<i style="background: maroon"></i><span>>5</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>4-5</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>3-4</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>2-3</span><br>';
  div.innerHTML += '<i style="background: #9acd32"></i><span>1-2</span><br>';
  div.innerHTML += '<i style="background: green"></i><span><1</span><br>';

  return div;
};

legend.addTo(myMap);

}
