// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });


  // Create the map object with center, zoom level, and default layer.
  let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [basemap]
  });
  
  // Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonicPlates.
  let earthquakes = new L.LayerGroup();
  let tectonicPlates = new L.LayerGroup();
  let baseMaps = {
    "Basemap": basemap
  };
  
  let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates,
    "Topographic Map": topo
  };
  
  // Add a control to the map that will allow the user to change which layers are visible.
  L.control.layers(baseMaps, overlays).addTo(map);
  
  // Make a request that retrieves the earthquake geoJSON data.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  
    // This function returns the style data for each of the earthquakes we plot on
    // the map. Pass the magnitude and depth of the earthquake into two separate functions
    // to calculate the color and radius.
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
  
    // This function determines the color of the marker based on the depth of the earthquake.
    function getColor(depth) {
      switch (true) {
        case depth > 90:
          return "#ea2c2c";
        case depth > 70:
          return "#ea822c";
        case depth > 50:
          return "#ee9c00";
        case depth > 30:
          return "#eecc00";
        case depth > 10:
          return "#d4ee00";
        default:
          return "#98ee00";
      }
    }
  
    // This function determines the radius of the earthquake marker based on its magnitude.
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
  
    // Add a GeoJSON layer to the map once the file is loaded.
    L.geoJson(data, {
      // Turn each feature into a circleMarker on the map.
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      // Set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    // OPTIONAL: Step 2
    // Add the data to the earthquake layer instead of directly to the map.
    }).addTo(earthquakes);
  
    // Add the earthquake layer to the map.
    earthquakes.addTo(map);
  
    // Create a legend control object.
    let legend = L.control({
      position: "bottomright"
    });
  
    // Then add all the details for the legend
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      const depths = [-10, 10, 30, 50, 70, 90];
      const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
      ];
  
      // Loop through our depth intervals to generate a label with a colored square for each interval.
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    // Finally, add the legend to the map.
    legend.addTo(map);
  
    // Make a request to get our Tectonic Plate geoJSON data.
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
      // Save the geoJSON data, along with style information, to the tectonicPlates layer.
      L.geoJson(plate_data, {
        color: "#ff6500",
        weight: 2
      }).addTo(tectonicPlates);
  
      // Then add the tectonicPlates layer to the map.
      tectonicPlates.addTo(map);
    });
  });
