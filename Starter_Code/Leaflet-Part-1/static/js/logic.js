// Define myMap before calling createFeatures functio
var myMap = L.map('map', {center: [37.09, -95.71], zoom: 2});

// Store API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Parameter 'data' represents data returned by API request it's successfully fetched
// 'function(data)' is callback function to be executed once data fetched
d3.json(queryUrl).then(function (data) {
  console.log(data);
// Inside callback function, data.features object/array gets passed as argument to createFeatures function for further processing
  createFeatures(data.features);});

// https://bootcampspot.instructure.com/courses/4981/external_tools/313
// Pass feature object as argument to functions where needed to define it
function createFeatures(earthquakeData) {
  L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature, 
    pointToLayer: function (feature, latlng) {
      var magnitude = feature.properties.mag;
      var depth = feature.geometry.coordinates[2];
      var fillColor = chooseColor(depth);

      var markers = {
        radius: magSize(magnitude)*5,
        color: "#000",
        weight: 1, 
        opacity: 0.8
      };

      return L.circleMarker(latlng, markers);
    }
  }).addTo(myMap);
}
// Function to bind popup to each layer
function onEachFeature(feature, layer) { 
//template litorals convert objects to string format
  layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
}

// Define marker sizes and shades
// Color Hex rgb found at https://www.w3.org/wiki/CSS/Properties/color/keywords
function magSize(mag) {return mag * 100;}

// Define depth ranges and colors
var depthRanges = [10, 30, 50, 70, 90];
var colors = ['#7fffd4', '#00ffff', '#008080', '#0000FF', '#000080', '#800000'];

function chooseColor(depth) {
  // Determine color based on depth value and depth ranges
  if (depth < depthRanges[0]) return colors[0]; // Aquamarine for depth < 10
  else if (depth < depthRanges[1]) return colors[1]; // Acqua for -10 <= depth < 30
  else if (depth < depthRanges[2]) return colors[2]; // Teal for 10 <= depth < 50
  else if (depth < depthRanges[3]) return colors[3]; // Blue for 30 <= depth < 70
  else if (depth < depthRanges[4]) return colors[4]; // Navy for 50 <= depth < 90
  else return colors[5];} // Maroon for depth >= 70

//https://bootcampspot.instructure.com/courses/4981/external_tools/313
// Create GeoJSON layer, 'earthquakes', containing earthquakeData object's features array
// Run onEachFeature function once for each piece of data in array
  var earthquakes = L.geoJSON(earthquakeData, { 
//Passing onEachFeature function to l.geoJSON method in Leaflet tells Leaflet how to handle each feature in GeoJSON data when creating layer 
    onEachFeature: onEachFeature,
    //pointToLayer enables customizing markers
      pointToLayer: function(feature, latlng) {
      //magnitude = feature.properties.mag;
      //depth = feature.geometry.coordinates[2];
        var fillColor = chooseColor(feature.geometry.coordinates[2]);
        //Customize markers by properties
        var markers = {
        radius: magSize(feature.properties.mag) * 5, //Adjust multiplier for appropriate size
        fillColor: fillColor,
        color: "#000", weight: 1, opacity: 1, fillOpacity: 0.8
      };
        return L.circleMarker(latlng,markers);
      }
    ) .addTo(myMap);
    });
//Function definition: what function does when it's called
function createMap(earthquakes) {
  //Function call: Send earthquakes layer to createMap function
  createMap(earthquakes);
  //Add markers to map
  markers.addTo(myMap); 
  // Create tile layer
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

myMap.addLayer(street);

// Update map options
myMap.options.layers = [street, earthquakes];

//Create legend
//https://bootcampspot.instructure.com/courses/4981/external_tools/313
var legend = L.control({position: 'bottomright'});  //Placement of legend on map
    
// Define legend content and styling
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    // Define depth ranges and colors
    var depthRanges = [10, 30, 50, 70, 90];
    var colors = ['#7fffd4', '#00ffff', '#008080', '#0000FF', '#000080', '#800000'];

      // Loop through deps and colors to create legend
      for (let i = 0; i < depthRanges.length; i++) {
        div.innerHTML += '<i style="background:' + chooseColor(depthRanges[i]) + '"></i> ' + depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
      }
        return div;};

    //Add legend control to map
    legend.addTo(myMap);}