// Define myMap before calling createFeatures function to avoid map initialization error
var myMap = L.map('map', {center: [37.09, -95.71], zoom: 2});

// Store API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Parameter 'data' represents data returned by API request it's successfully fetched
// 'function(data)' is callback function to be executed once data fetched
d3.json(queryUrl).then(function (data) {
// Inside callback function, data.features object/array gets passed as argument to createFeatures function for further processing
  createFeatures(data.features);
});

// https://bootcampspot.instructure.com/courses/4981/external_tools/313
// Pass feature object as argument to functions where needed to define it
function createFeatures(earthquakeData) {
    // Function to bind popup to each layer
    function onEachFeature(feature, layer) { 
    //template litorals convert objects to string format
      layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
    //Define GeoJSON layer with earthquakeData object and features array 
    function makeCircleMarker(feature, latlng){
        //Specify marker look
        var markers = {
            radius: feature.properties.mag*5,
            color: chooseColor(feature.geometry.coordinates[2]),
            fillcolor: chooseColor(feature.geometry.coordinates[2]),
            weight: 1, 
            opacity: 0.8
          }
          return L.circleMarker(latlng, markers);
        }

    //Define earthquakes as layer composed of earthquake Data
    var earthquakes = L.geoJSON(earthquakeData, {
        //Specify each feature gets circle marker over it
        onEachFeature: onEachFeature, 
        pointToLayer: makeCircleMarker
    });

    //Specify earthquakes layer becomes part of createMap function
    createMap(earthquakes);
    }
    
    // Determine marker color based on depth value and depth ranges
    function chooseColor(depth) {
        if (depth < 10) return '#7fffd4'; // Aquamarine for depth < 10
        else if (depth <30 )return '#00ffff'; // Acqua for -10 <= depth < 30
        else if (depth < 50) return '#008080'; // Teal for 10 <= depth < 50
        else if (depth < 70) return '#0000FF'; // Blue for 30 <= depth < 70
        else if (depth < 90) return '#000080'; // Navy for 50 <= depth < 90
        else return '#800000'; // Maroon for depth >= 70
    }

// Define tile layer
    function createMap(earthquakes) {
        let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
    
        // Define baseMaps object to hold base layer
        let baseMap = {"Street Map": street};
        
        // Update existing map, don't re-initialize it
            myMap.setView([39.8282, -98.5795], 4);
            myMap.addLayer(street);
            myMap.addLayer(earthquakes);

        //Define layer control
        L.control.layers(baseMap, {"Earthquakes": earthquakes},{
            collapsed: false
        }).addTo(myMap);

        //  Include legend
        var legend = L.control({position: "bottomright"});
        legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "info legend"),
                depth = [10, 30, 50, 70, 90];

           for (var i = 0; i < depth.length; i++) {
               div.innerHTML += '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
           }
           return div;
    };
    legend.addTo(myMap);     
}
