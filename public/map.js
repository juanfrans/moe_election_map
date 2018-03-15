(function() {
  console.log("Start...");

  // Setting up the margins for the SVG
  var margin = {top: 0, left: 0, right: 0, bottom: 0},
    height = 650 - margin.top - margin.bottom,
    width = 1280 - margin.left - margin.right;

  // Creating the main SVG and positioning it
  var svg = d3.select("#map")
    .append("svg")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Creating the projection
  var projection = d3.geoMollweide()
    .translate([width / 2, height / 2])
    .scale(220)

  // Creating the graticule
  var graticule = d3.geoGraticule();

  // Create a "line generator" to be able to draw the lines based on the points
  var path = d3.geoPath()
    .projection(projection);

  // // Loading the data with d3
  // d3.queue()
  //   .defer(d3.json, "data/world_50m_topo_data.topojson")
  //   .await(ready)

  var electionData = d3.map();

  d3.queue()
    .defer(d3.json, "data/World_50m_Updated.topojson")
    .defer(d3.csv, "data/ElectionData.csv")
    .await(ready)

  function ready(error, geoData, electionData) {
    if(error) throw error;

    // Extracting countries and converting them into something we can use
    var countries = topojson.feature(geoData, geoData.objects.World_50m_Updated).features // This is crucial, make sure you are pointing to the right place in the file
    // console.log(countries);

    // Joining the two files
    for (var i = 0; i < electionData.length; i++) {
      for (var j = 0; j < countries.length; j++) {
        if (countries[j].properties.ISO_A2 == electionData[i].IsoCode) {
          countries[j].properties.EleElection = "Yes";
          countries[j].properties.Region = electionData[i].Region;
          countries[j].properties.Participacion = electionData[i].Participacion;
          countries[j].properties.Obligatorio = electionData[i].Obligatorio;
          countries[j].properties.Polity = electionData[i].Polity;
          countries[j].properties.Tipo1 = electionData[i].Tipo1;
          countries[j].properties.Ano1 = electionData[i].Ano1;
          countries[j].properties.Fecha1_1 = electionData[i].Fecha1_1;
          countries[j].properties.Fecha1_2 = electionData[i].Fecha1_2;
          countries[j].properties.Descripcion1 = electionData[i].Descripcion1;
          countries[j].properties.Fuente1 = electionData[i].Fuente1;
          countries[j].properties.Tipo2 = electionData[i].Tipo2;
          countries[j].properties.Ano2 = electionData[i].Ano2;
          countries[j].properties.Fecha2_1 = electionData[i].Fecha2_1;
          countries[j].properties.Fecha2_2 = electionData[i].Fecha2_2;
          countries[j].properties.Descripcion2 = electionData[i].Descripcion2;
          countries[j].properties.Fuente2 = electionData[i].Fuente2;
          countries[j].properties.Tipo3 = electionData[i].Tipo3;
          countries[j].properties.Ano3 = electionData[i].Ano3;
          countries[j].properties.Fecha3_1 = electionData[i].Fecha3_1;
          countries[j].properties.Fecha3_2 = electionData[i].Fecha3_2;
          countries[j].properties.Descripcion3 = electionData[i].Descripcion3;
          countries[j].properties.Fuente3 = electionData[i].Fuente3;
          break;
        }
      }
    }

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
        // if(d.properties.EleElection == "Yes"){
        if(d3.select(this).attr("class") == "elections"){
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
          }
          else {
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

    // Getting data from the select menus
    d3.select("#year").on('change', function(d){
      var year = d3.select(this).property('value');
      d3.selectAll(".elections").classed("elections", false).classed("country", true);
      d3.selectAll(".country").classed("elections", false).attr("class", function(d){
        if (year == "allYears"){
          if (d.properties.EleElection){
            return "elections";
          }
          else {
            return "country";
          }
        }
        else if(d.properties.Ano1 == year){
          return "elections";
        }
        else {
          return "country";
        }
      });
    });
    d3.select("#electionType").on('change', function(){
      var electionType = d3.select(this).property('value');
      console.log(electionType);
    });
  }
})();
