
    
anychart.onDocumentReady(function () {
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json
    anychart.data.loadJsonFile(
      'https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json',
      function (data) {
        var map = anychart.map();
  
         map
          .credits()
          .enabled(true)
          .url(
            'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
          )
          .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico')
          .text(
            'Data source: https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
          ); 
  
        map
          .title()
          .enabled(true)
          .useHtml(true)
          .padding([10, 0, 10, 0])
          .text(
            'Population Density (people per km²)<br/>' +
              '<span  style="color:#929292; font-size: 12px;">(Data source: Wikipedia, 2015)</span>'
          );
  
        map.geoData('anychart.maps.world');
        map.interactivity().selectionMode('none');
        map.padding(0);
  
        var dataSet = anychart.data.set(data);
        var densityData = dataSet.mapAs({ value: 'density' });
        var series = map.choropleth(densityData);
  
        series.labels(false);
  
        series
          .hovered()
          .fill('#f48fb1')
          .stroke(anychart.color.darken('#f48fb1'));
  
        series
          .selected()
          .fill('#c2185b')
          .stroke(anychart.color.darken('#c2185b'));
  
        series
          .tooltip()
          .useHtml(true)
          .format(function () {
            return (
            //   '<span style="color: #d9d9d9">Eggs</span>: ' +
            //   parseFloat(this.value).toLocaleString() +
            //   ' pop./km² <br/>' +
            //   '<span style="color: #d9d9d9">Density</span>: ' +
            //   parseInt(this.getData('density')).toLocaleString() +
            //   '<br/>' +
            //   '<span style="color: #d9d9d9">Eggs Again</span>: ' +
            //   parseInt(this.getData('eggs')).toLocaleString() +
            //   '<br/>' +
            //   '<span style="color: #d9d9d9">Production</span>: ' +
            //   parseInt(this.getData('production')).toLocaleString() +
            //   ' km²'
              '<span style="color: #d9d9d9">Density</span>: ' +
              parseFloat(this.value).toLocaleString() +
              ' pop./km² <br/>' +
              '<span style="color: #d9d9d9">Population</span>: ' +
              parseInt(this.getData('population')).toLocaleString() +
              '<br/>' +
              '<span style="color: #d9d9d9">Area</span>: ' +
              parseInt(this.getData('area')).toLocaleString() +
              ' km²'
            );
          });
  
        var scale = anychart.scales.ordinalColor([
          { less: 10 },
          { from: 10, to: 30 },
          { from: 30, to: 50 },
          { from: 50, to: 100 },
          { from: 100, to: 200 },
          { from: 200, to: 300 },
          { from: 300, to: 500 },
          { from: 500, to: 1000 },
          { greater: 1000 }
        ]);
        scale.colors([
          '#81d4fa',
          '#4fc3f7',
          '#29b6f6',
          '#039be5',
          '#0288d1',
          '#0277bd',
          '#01579b',
          '#014377',
          '#000000'
        ]);
  
        var colorRange = map.colorRange();
        colorRange.enabled(true).padding([0, 0, 20, 0]);
        colorRange
          .ticks()
          .enabled(true)
          .stroke('3 #ffffff')
          .position('center')
          .length(7);
        colorRange.colorLineSize(5);
        colorRange.marker().size(7);
        colorRange
          .labels()
          .fontSize(11)
          .padding(3, 0, 0, 0)
          .format(function () {
            var range = this.colorRange;
            var name;
            if (Number.isFinite(range.start + range.end)) {
              name = range.start + ' - ' + range.end;
            } else if (Number.isFinite(range.start)) {
              name = 'More than ' + range.start;
            } else {
              name = 'Less than ' + range.end;
            }
            return name;
          });
  
        series.colorScale(scale);
  
        // create zoom controls
        var zoomController = anychart.ui.zoom();
        zoomController.render(map);
  
        // set container id for the chart
        map.container('map-container');
        // initiate chart drawing
        map.draw();
      }
    );
  });
  
  
            