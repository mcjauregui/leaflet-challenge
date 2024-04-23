# leaflet-challenge
Challenge 15, Part 1
Note: Please see logicmap.js (not logic.js) for the JavaScript used to complete this project. 

The United States Geological Survey, USGS, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

The tool created in logicmap.js pulls from the USGS API the most recent 7 days worth of earthquake data from around the globe. It uses this data to visualize the realtive size (magnitude) and depth of each quake event with circular markers that are sized and colored according to event characteristics. Linked to each marker is a popup window that displays the location, date, time, magnitude, and depth of the event. 

leaflet-challenge-map.png
![leaflet-challenge-map](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/f334192d-e212-4b0a-95d9-eea1c51c6694)
QuakeExample.png
![QuakeExample](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/cfda3353-946b-4354-8961-5b680b7ddd71)

The JSON filed used to build this tool was downloaded from "Past 7 Days, All Earthquakes' link at https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. In prettyprint format, the beginning of the JSON file looked like this:
JSON.png
![JSON](https://github.com/mcjauregui/leaflet-challenge/assets/151464511/3b574f74-2d9c-4c3a-b97b-d9c4f75c5597)

The URL for this JSON file, https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson, is used in the logicmap.js file so that the .js file runs the most up-to-date version of the JSON file. Per the USGS, this file is updated every minute. 

To import and visualize the earthquake data, I used Leaflet to create a map designed to plot all earthquakes in the data set. The data included latitude and longitude coordinates, which identified where on the map to plot the earthquakes. 

I also created circular markers to indicate each earthquake location. The circular markers varied in size to reflect the different magnitude of each quake (with smaller markers for smaller quakes). The markers also varied in color, to reflect the depth of each earthquake. The legend on the map shows that shallower quakes are denoted by lighter colors and deeper quakes denoted by darker colors. 

