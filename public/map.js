var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1GhF3rCCAFHT3FUOAGDSsyKDwUU4jO33vh1Kfe5CpymE/edit?usp=sharing';
function getData() {
  Tabletop.init( { key: publicSpreadsheetUrl,
    callback: draw,
    simpleSheet: true } )
  }
  function draw(data, tabletop) {
    console.log("Got data from GoogleSheets");
    drawMap(data);
  }

  getData();

  function drawMap(googleData) {
    console.log("Drawing the map...");
    console.log("has this updated?");

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

    d3.queue()
    .defer(d3.json, "data/World_50m_Updated.topojson")
    .await(ready)

    function ready(error, geoData) {
      if(error) throw error;
      // Extracting countries and converting them into something we can use
      var countries = topojson.feature(geoData, geoData.objects.World_50m_Updated).features // This is crucial, make sure you are pointing to the right place in the file

      // Joining the two files
      for (var i = 0; i < googleData.length; i++) {
        for (var j = 0; j < countries.length; j++) {
          if (countries[j].properties.ISO_A2 == googleData[i].IsoCode) {
            countries[j].properties.EleElection = "Yes";
            countries[j].properties.Region = googleData[i].Region;
            countries[j].properties.Participacion = googleData[i].Participacion;
            countries[j].properties.Obligatorio = googleData[i].Obligatorio;
            countries[j].properties.Polity = googleData[i].Polity;
            countries[j].properties.Tipo1 = googleData[i].Tipo1;
            countries[j].properties.Ano1 = googleData[i].Ano1;
            countries[j].properties.Fecha1_1 = googleData[i].Fecha1_1;
            countries[j].properties.Fecha1_2 = googleData[i].Fecha1_2;
            countries[j].properties.Descripcion1 = googleData[i].Descripcion1;
            countries[j].properties.Fuente1 = googleData[i].Fuente1;
            countries[j].properties.Tipo2 = googleData[i].Tipo2;
            countries[j].properties.Ano2 = googleData[i].Ano2;
            countries[j].properties.Fecha2_1 = googleData[i].Fecha2_1;
            countries[j].properties.Fecha2_2 = googleData[i].Fecha2_2;
            countries[j].properties.Descripcion2 = googleData[i].Descripcion2;
            countries[j].properties.Fuente2 = googleData[i].Fuente2;
            countries[j].properties.Tipo3 = googleData[i].Tipo3;
            countries[j].properties.Ano3 = googleData[i].Ano3;
            countries[j].properties.Fecha3_1 = googleData[i].Fecha3_1;
            countries[j].properties.Fecha3_2 = googleData[i].Fecha3_2;
            countries[j].properties.Descripcion3 = googleData[i].Descripcion3;
            countries[j].properties.Fuente3 = googleData[i].Fuente3;
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
      .on("click", function(d) {
        var year = d3.select("#year").property('value');
        var electionType = d3.select("#electionType").property('value');
        d3.selectAll(".selected").classed("selected", false);
        if(d3.select(this).attr("class") == "elections"){
          d3.select(this).classed("selected", true);
          d3.select("#popup")
            .select("#name")
            .text(d.properties.NombreEsp);

          // Add description to popup
          d3.select("#popElectionType1")
          .text("Tipo de elección: " + d.properties.Tipo1);
          if (d.properties.Fecha1_2) {
            d3.select("#popElectionDate1")
            .text(d.properties.Fecha1_1 + ", " + d.properties.Ano1 + " (2da vuelta: " + d.properties.Fecha1_2 + ", " + d.properties.Ano1 + ")");
          }
          else {
            d3.select("#popElectionDate1")
            .text(d.properties.Fecha1_1 + ", " + d.properties.Ano1);
          }
          if (d.properties.Tipo2){
            d3.select("#popElectionType2").text("Tipo de elección: " + d.properties.Tipo2);
            d3.select("#secondElection").classed("hidden", false);
            if (d.properties.Fecha2_2) {
              d3.select("#popElectionDate2")
              .text(d.properties.Fecha2_1 + ", " + d.properties.Ano2 + " (2da vuelta: " + d.properties.Fecha2_2 + ", " + d.properties.Ano2 + ")");
            }
            else {
              d3.select("#popElectionDate2")
              .text(d.properties.Fecha2_1 + ", " + d.properties.Ano2);
            }
          }
          else {
            d3.select("#popElectionType2").text("");
            d3.select("#secondElection").classed("hidden", true);
            d3.select("#popElectionDate2").text("");
          }
          if (d.properties.Tipo3){
            d3.select("#popElectionType3").text("Tipo de elección: " + d.properties.Tipo3);
            d3.select("#thirdElection").classed("hidden", false);
            if (d.properties.Fecha3_2) {
              d3.select("#popElectionDate3")
              .text(d.properties.Fecha3_1 + ", " + d.properties.Ano3 + " (2da vuelta: " + d.properties.Fecha3_2 + ", " + d.properties.Ano3 + ")");
            }
            else {
              d3.select("#popElectionDate3")
              .text(d.properties.Fecha3_1 + ", " + d.properties.Ano3);
            }
          }
          else {
            d3.select("#popElectionType3").text("");
            d3.select("#thirdElection").classed("hidden", true);
            d3.select("#popElectionDate3").text("");
          }
          if (d.properties.Participacion) {
            d3.select("#popParticipation")
            .text("Participación en últimas elecciones: " + d.properties.Participacion);
          }
          else {
            d3.select("#popParticipation").text("");
          }
          if (d.properties.Obligatorio) {
            if (d.properties.Obligatorio == 1) {
              d3.select("#popObligatory").text("Voto obligatorio: " + "Sí");
            }
            else {
              d3.select("#popObligatory").text("Voto obligatorio: " + "No");
            }
          }
          else {
            d3.select("#popObligatory").text("");
          }
          if (d.properties.Polity) {
            d3.select("#popScore").text("Puntaje Polity ⃰: " + d.properties.Polity);
          }
          else {
            d3.select("#popScore").text("");
          }
          if (d.properties.Fuente1) {
            d3.select("#fuente1")
            .attr("href", d.properties.Fuente1)
            .text("Fuente 1");
          }
          else {
            d3.select("#fuente1").text("");
          }
          if (d.properties.Fuente2) {
            d3.select("#fuente2")
            .attr("href", d.properties.Fuente2)
            .text("Fuente 2");
          }
          else {
            d3.select("#fuente2").text("");
          }
          if (d.properties.Fuente3) {
            d3.select("#fuente3")
            .attr("href", d.properties.Fuente3)
            .text("Fuente 3");
          }
          else {
            d3.select("#fuente3").text("");
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
        // Deselecting all other options
        var region = d3.select("#region").property('value');
        var electionType = d3.select("#electionType").property('value');
        if (region != "allRegions"){
          var options = document.querySelectorAll("#region option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        if (electionType != "allTypes"){
          var options = document.querySelectorAll("#electionType option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        // Applying the new selection
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
          else if(d.properties.Ano1 == year || d.properties.Ano2 == year || d.properties.Ano3 == year){
            return "elections";
          }
          else {
            return "country";
          }
        });
      });
      d3.select("#electionType").on('change', function(){
        // Deselecting all other options
        var year = d3.select("#year").property('value');
        var region = d3.select("#region").property('value');
        if (year != "allYears"){
          var options = document.querySelectorAll("#year option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        if (region != "allRegions"){
          var options = document.querySelectorAll("#region option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        // Applying the new selection
        var electionType = d3.select(this).property('value').toUpperCase();
        d3.selectAll(".elections").classed("elections", false).classed("country", true);
        d3.selectAll(".country").classed("elections", false).attr("class", function(d){
          var Tipo1, Tipo2, Tipo3;
          if (d.properties.Tipo1){
            Tipo1 = d.properties.Tipo1.toUpperCase();
          }
          else{}
          if (d.properties.Tipo2){
            Tipo2 = d.properties.Tipo2.toUpperCase();
          }
          else{}
          if (d.properties.Tipo3){
            Tipo3 = d.properties.Tipo3.toUpperCase();
          }
          else{}
          if (electionType == "ALLTYPES"){
            if (d.properties.EleElection){
              return "elections";
            }
            else {
              return "country";
            }
          }
          else if(Tipo1 == electionType || Tipo2 == electionType || Tipo3 == electionType) {
            return "elections";
          }
          else {
            return "country";
          }
        });
      });
      d3.select("#region").on('change', function(d){
        // Deselecting all other options
        var year = d3.select("#year").property('value');
        var electionType = d3.select("#electionType").property('value');
        if (year != "allYears"){
          var options = document.querySelectorAll("#year option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        if (electionType != "allTypes"){
          var options = document.querySelectorAll("#electionType option");
          for (var i = 0; i < options.length; i++) {
            options[i].selected = options[i].defaultSelected;
          }
        }
        else {}
        // Applying the new selection
        var selectedRegion = d3.select(this).property('value').toUpperCase();
        console.log(selectedRegion);
        d3.selectAll(".elections").classed("elections", false).classed("country", true);
        d3.selectAll(".country").classed("elections", false).attr("class", function(d){
          var thisRegion;
          if (d.properties.Region){
            thisRegion = d.properties.Region.toUpperCase();
          }
          else{}
          if (selectedRegion == "ALLREGIONS"){
            if (d.properties.EleElection){
              return "elections";
            }
            else {
              return "country";
            }
          }
          else if(thisRegion == selectedRegion) {
            return "elections";
          }
          else {
            return "country";
          }
        });
      });
    }
  };
