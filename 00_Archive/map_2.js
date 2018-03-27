console.log("Start...");

// Setting up the margins for the SVG
var margin = {top: 0, left: 0, right: 0, bottom: 0},
  height = 650 - margin.top - margin.bottom,
  width = 1280 - margin.left - margin.right;

var year = "allYears",
  electionType = "allTypes";

// Creating the main SVG and positioning it
var svg = d3.select("#map")
  .append("svg")
// .attr("height", height + margin.top + margin.bottom)
// .attr("width", width + margin.right + margin.left)
  .attr("viewBox", "0 0 " + width + " " + height)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Creating the projection
var projection = d3.geoMollweide()
  .translate([width / 2, height / 2])
  .scale(220)

// Creating the projection
// var projection = d3.geoRobinson()
//   .translate([width / 2, height / 2])
//   .scale(225)

// Creating the graticule
var graticule = d3.geoGraticule();

// Create a "line generator" to be able to draw the lines based on the points
var path = d3.geoPath()
  .projection(projection);

// Loading the data with d3
d3.queue()
  .defer(d3.json, "data/world_50m_topo_data.topojson")
  .await(drawMap)

function drawMap(error, data, year, electionType) {
  console.log(data);

  // Extracting countries and converting them into something we can use
  var countries = topojson.feature(data, data.objects.World50_Simplified_Data).features // This is crucial, make sure you are pointing to the right place in the file
  console.log(countries);

  svg.selectAll(".country")
    .data(countries)
    .enter().append("path")
    .attr("class", "country")
    .attr("d", path)
    .attr("class", function(d) {
      if(d.properties.EleElection == "Yes"){
        return "elections";
      } else {
        return "country";
      }
      if(year != "allYears" && d.properties.EleElection == "Yes"){
        return "national";
      }
    })
  // .on("mouseover", function(d) {
  //   if(d.properties.EleElection) {
  //     d3.select(this).style("cursor", "pointer");
  //   } else {
  //     d3.select(this).style("cursor", "default");
  //   }
  // })
    .on("mouseover", function(d) {
    // console.log(d.properties.ABBREV);
      d3.selectAll(".selected").classed("selected", false);
      if(d.properties.EleElection == "Yes"){
        d3.select(this).classed("selected", true);
      // console.log(d.properties.EleNationalElection1);
      // Get the coordinates for the popup
        var posX = event.clientX;
      // if(posX > (width * 0.75)){
      //   posX = posX - 290
      // }
        var posY = event.clientY;
      // if(posY > (height - 120)){
      //   posY = posY - 100
      // }
      // Add position and title to popup
        d3.select("#popup")
          .style("left", posX -80 + "px")
          .style("top", posY + "px")
          .select("#name")
          .text(d.properties.SOVEREIGNT);
      // Add description to popup
        d3.select("#popup")
          .select("#description")
          .text(d.properties.EleDateNatElec1 + ": " + d.properties.EleNationalElection1);
        if(d.properties.EleNotesNatElec1){
          d3.select("#notes")
          .text(d.properties.EleNotesNatElec1);
        } else {
          d3.select("#notes")
            .text("");
        }
        if(d.properties.EleNationalElection2){
          d3.select("#description2")
            .text(d.properties.EleDateNatElec2 + ": " + d.properties.EleNationalElection2);
      }
      else {
        d3.select("#description2")
        .text("");
      }
      if(d.properties.EleNotesNatElec2){
        d3.select("#notes2")
        .text(d.properties.EleNotesNatElec2);
      }
      else {
        d3.select("#notes2")
        .text("");
      }
      if(d.properties.EleNationalElection3){
        d3.select("#description3")
        .text(d.properties.EleDateNatElec3 + ": " + d.properties.EleNationalElection3);
      }
      else {
        d3.select("#description3")
        .text("");
      }
      if(d.properties.EleNotesNatElec3){
        d3.select("#notes3")
        .text(d.properties.EleNotesNatElec3);
      }
      else {
        d3.select("#notes3")
        .text("");
      }
      if(d.properties.EleNationalElection4){
        d3.select("#description4")
        .text(d.properties.EleDateNatElec4 + ": " + d.properties.EleNationalElection4);
      }
      else {
        d3.select("#description4")
        .text("");
      }
      if(d.properties.EleNotesNatElec4){
        d3.select("#notes4")
        .text(d.properties.EleNotesNatElec4);
      }
      else {
        d3.select("#notes4")
        .text("");
      }
      d3.select("#popup")
      .classed("hidden", false);
    }
    else {
      d3.select("#popup").classed("hidden", true);
    }
  });

  // Drawing the graticule
  svg.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);

  svg.append("path")
  .datum(graticule.outline())
  .attr("class", "graticuleOutline")
  .attr("d", path);
}

// Getting data from the select menus
d3.select("#year").on('change', function(){
  year = d3.select(this).property('value');
  drawMap(data, year, electionType);
  console.log(year);
});
d3.select("#electionType").on('change', function(){
  electionType = d3.select(this).property('value');
  console.log(electionType);
});
