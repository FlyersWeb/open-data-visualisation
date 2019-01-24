const d3 = require('d3');
import './style.css';
import Data from './définitif_patrimoine.csv'

const margin = 60;
const width = 1024;
const height = 640;

const svg = d3.select('#map')
  .attr("width", width + 2 * margin)
  .attr("height", height + 4 * margin)
  .attr("class", "isf");

const path = d3.geoPath();

const projection = d3.geoConicConformal()
  .center([2.454071, 46.279229])
  .scale(2600)
  .translate([width / 2, height / 2]);

path.projection(projection);

const deps = svg.append("g");

// d3.json('communes-version-simplifiee.geojson').then(function(geojson) {
d3.json('src/departments.json').then(function(geojson) {
  console.log(geojson)
  deps.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("mouseover", function(d) {
      div.transition()        
          .duration(200)
          .style("opacity", .9);      
      div.html("Département : " + d.properties.NOM_DEPT + "<br/>"
            +  "Région : " + d.properties.NOM_REGION)  
          .style("left", (d3.event.pageX + 30) + "px")     
          .style("top", (d3.event.pageY - 30) + "px")
  })
  .on("mouseout", function(d) {
      div.style("opacity", 0);
      div.html("")
          .style("left", "-500px")
          .style("top", "-500px");
  });
});

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);


