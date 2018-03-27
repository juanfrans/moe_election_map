<!DOCTYPE html>
<meta charset="utf-8">
<style>

/*.graticule {
fill: none;
stroke: #777;
stroke-width: 0.5px;
stroke-opacity: 0.5;
}

.land {
fill: #222;
}

.boundary {
fill: none;
stroke: #fff;
stroke-width: 0.5px;
}*/

</style>
<body>

  <!-- Loading the libraries -->
  <script src="https://d3js.org/d3.v4.0.0-alpha.50.min.js"></script>
  <script src="https://d3js.org/topojson.v1.min.js"></script>

  <!-- Creating the map with d3.js -->
  <script>

  var width = 1024;
  var height = 512;

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  // Loading the map data
  d3.json("data/world_50m_topo.topojson", function(error, world) {
    if (error) return console.error(error);
    console.log(world.objects.world_50m.geometries[0].properties.ABBREV);
    svg.append("path")
      // .datum(topojson.feature(world, world.objects.subunits))
      .attr("d", d3.geoPath().projection(d3.geoEquirectangular()));
  });


  // var width = 960,
  //     height = 480;
  //
  // var projection = d3.geoEquirectangular()
  //     .scale(height / Math.PI)
  //     .translate([width / 2, height / 2]);
  //
  // var path = d3.geoPath()
  //     .projection(projection);
  //
  // var graticule = d3.geoGraticule();
  //
  // var svg = d3.select("body").append("svg")
  //     .attr("width", width)
  //     .attr("height", height);
  //
  // svg.append("path")
  //     .datum(graticule)
  //     .attr("class", "graticule")
  //     .attr("d", path);
  //
  // d3.json("/data/world_50m_topo.json", function(error, world) {
  //   var countries = topojson.feature(world, world.objects.countries).features
  //     svg.selectAll(".country")
  //       .data(countries)
  //     .enter().insert("path", ".graticule")
  //       .attr("class", function(d) { return "country " + "code" + d.id; })
  //       .attr("d", path);
  // });

  // d3.json("data/world_50m_topo.json", function(error, world) {
  //   if (error) throw error;
  //
  //   svg.insert("path", ".graticule")
  //       .datum(topojson.feature(world, world.objects.land))
  //       .attr("class", "land")
  //       .attr("d", path);
  //
  //   svg.insert("path", ".graticule")
  //       .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
  //       .attr("class", "boundary")
  //       .attr("d", path);
  // });

  </script>
