      // Map settings
      var map = L.Mapzen.map('electionMap', {
        apiKey: 'mapzen-h1njtmE',
        center: [40.722570, -73.997099],
        zoom: 12,
        minZoom: 7,
        maxZoom: 19,
        maxBounds: [[44.292059, -78.209836], [36.990458, -68.924623]],
        attribution: '© <a href="http://c4sr.columbia.edu/">Center for Spatial Research</a>, <a href="http://archleague.org/">Architectural League</a>, <a href="https://www.mapzen.com/rights">Mapzen</a>, <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, and <a href="https://www.mapzen.com/rights/#services-and-data-sources">others</a>',
        tangramOptions: {
          scene: 'scene.yaml'
        },
      });

      var FullScreenToggle = L.Control.extend({
          options: {
              position: 'bottomleft'
          },
      onAdd: function() {
        var container = L.DomUtil.create('div', 'layer-control');
        container.innerHTML = '<div class="leaflet-control-fullscreen leaflet-bar leaflet-control"><a class="leaflet-control-fullscreen-button leaflet-bar-part" href="#" title="View Fullscreen" style="outline: none;"></a></div>';
        L.DomEvent.on(container, 'click', this.toggleOnClick);
        return container;
      },
      toggleOnClick: function(e) { map.toggleFullscreen(); }
      });

      var fullScreenToggleControl = new FullScreenToggle();
      map.addControl(fullScreenToggleControl);

      // Create the popup element
      var popup = L.popup();

      // Add selection events
      function onMapClick(selection) {
        if(selection.feature) {
          var latlng = selection.leaflet_event.latlng;
          var name = selection.feature.properties.NAME;
          var category = selection.feature.properties.CATEGORY;
          var subcategory = selection.feature.properties.SUBCATEGORY;
          var description = selection.feature.properties.DESCRIPTION;
          showPopup(latlng, name, description, category, subcategory);
        }
      }

      // Add Tangram Listener
      var scene;
      map.on('tangramloaded', function(e) {
        var tangramLayer = e.tangramLayer;
        scene = tangramLayer.scene;
        tangramLayer.setSelectionEvents({
          click: onMapClick,
          hover: onMapHover
        });
      });

      function showPopup(latlng, name, description, category, subcategory) {
        popup
          .setLatLng(latlng)
          .setContent('<h1>' + name + '</h1><p>' + description + '</p><p>' + category.toUpperCase() + ': ' + subcategory.toUpperCase() + '</p>')
          .openOn(map);
      }
      function onMapHover(selection){
        document.getElementById('electionMap').style.cursor = selection.feature ? 'pointer' : '';
      }
