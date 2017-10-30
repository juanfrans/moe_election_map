## Notes on Making an Interactive Web-Map

### D3.js
#### Getting the data
Need to download the base data first and convert it to topojson format.
* Download data from [Natural Earth](http://www.naturalearthdata.com/downloads/). The 1:50 (medium scale) cultural file (without boundary lakes) seems to be the one that works for that level of detail.
* Bring into QGIS and export as a geojson.
* Make sure you have `gdal` and `node` installed. If not you can install them via `brew`.
* Convert your normal geojson file to a topojson:
  * Note that the `topojson` executable command has now changed to `geo2topo`
  * To create a topojson file do: `geo2topo -o topo-output.json geo-input.json`
* Test that your file works well by dropping it into [Mapshaper](http://mapshaper.org/).

#### To do
* Simplify the data (get rid of a lot of columns in QGIS)

#### References:
* https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c
* https://bl.ocks.org/mbostock/3757119
* http://davewood.me/blog/2014/04/09/drawing-a-world-map-with-d3/
* http://www.naturalearthdata.com/downloads/
* https://bost.ocks.org/mike/map/#installing-tools
* http://mapshaper.org/
* https://www.youtube.com/watch?v=aNbgrqRuoiE
* http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
* http://alignedleft.com/tutorials/d3
* http://chimera.labs.oreilly.com/books/1230000000345/ch10.html#_html_div_tooltips

#### Data Problems
* All regions? Or just latin America?
* Fill in the regions (ie. Malvinas)
* Multiple elections on the same date, is it one election or various? (ie. Chile)
* Are there any "subnational" elections?
* English or Spanish?
* Riesgo electoral?
* Text limit for notes (max. 150 words).
* Names of the countries, Spanish or English?
* Manually change Northern Cyprus (CYN), Somalialand (SOL), Gibraltar, Norway (NO)

* Mandar proyecciones a Andres
* Mandar otra version con paralelos y meridianos
* 2017 / 2018 / 2019 / 2020
* How to close the popup
* Disenar el armazon tambien con titulo / texto / etc.
* Arriba, boton espano e ingles
* Colores: amarillo, azul y rojo
* tipo de letra
* Titulo
* Description
