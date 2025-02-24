# leaflet-challenge
Mapping- Advanced interactive visualizations (js, Leaflet, GEOJson) MOD 15 Challenge (week 15)

## Part 1: Create the Earthquake Visualization

Your first task is to visualize an earthquake dataset. Complete the following steps:

### Get your dataset. 
To do so, follow these steps:
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. 
1. Visit the USGS GeoJSON Feed, Link: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php', and choose a dataset to visualize. 
2 When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. 
3. Use the URL of this JSON to pull in the data for the visualization.

### Import and visualize the data by doing the following:
1. Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    a. Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
    b. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

    ** Hint: The depth of the earth can be found as the third coordinate for each earthquake. **

2. Include popups that provide additional information about the earthquake when its associated marker is clicked.
3. Create a legend that will provide context for your map data.
4. Your visualization should look something like the preceding map.

## Part 2: Gather and Plot More Data (Optional with no extra points earning)
Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. 
You will need to pull in this dataset and visualize it alongside your original data. 
Data on tectonic plates can be found at link: 'https://github.com/fraxen/tectonicplates'.

### Perform the following tasks:
1. Plot the tectonic plates dataset on the map in addition to the earthquakes.
2. Add other base maps to choose from (Topographic layer added).
3. Put each dataset into separate overlays that can be turned on and off independently.
4. Add layer controls to your map.

