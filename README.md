# leaflet-challenge  
Challenge 15, Part 1  
Note: Please see logicmap.js (not logic.js) for the JavaScript used to complete this project.   

The United States Geological Survey, USGS, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The tool created in logicmap.js pulls from the USGS API the most recent 7 days worth of earthquake data from around the globe. It uses this data to visualize the realtive size (magnitude) and depth of each quake event with circular markers that are sized and colored according to event characteristics. Linked to each marker is a popup window that displays the location, date, time, magnitude, and depth of the event. 

leaflet-challenge-map.png
![leaflet-challenge-map](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/27312c5a-a6c9-4ba9-9868-d93c1efb7db1)

quakeexample.png
![quakeexample](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/9188e58e-93f1-49a2-97c5-39926ba9982d)

The JSON file used to build this tool was downloaded from "Past 7 Days, All Earthquakes' link at https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. In prettyprint format, the beginning of the JSON file looked like this:
JSON.png
![JSON](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/3b574f74-2d9c-4c3a-b97b-d9c4f75c5597)

The URL for this JSON file, https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson, is used in the logicmap.js file so that the .js file runs the most up-to-date version of the JSON file. Per the USGS, this file is updated every minute. 

To import and visualize the earthquake data, I used Leaflet to create a map designed to plot all earthquakes in the data set. The data included latitude and longitude coordinates, which identified where on the map to plot the earthquakes. 

I also created circular markers to indicate each earthquake location. The circular markers varied in size to reflect the different magnitude of each quake (with smaller markers for smaller quakes). The markers also varied in color, to reflect the depth of each earthquake. The legend on the map shows that shallower quakes are denoted by lighter colors and deeper quakes denoted by darker colors. 

Besides referring to in-class exercises for JavaScript functions and syntax, I used both the Xpert Learning Assistant and Chat GPT to identify errors in my orders of operation and syntax while writing the logicmap.js. As I renamed the .js file from logic.js to logicmap.js, I updated the associtiated HTML file to reference logicmap.js instead of logic.js. The additional code I added to the style.css file was suggested by the Xpert Learning Assistant when I described to it how I wanted the legend to look. To get the complete legend to appear in the map, I added a div class for "info legend" to the HTML file. 
