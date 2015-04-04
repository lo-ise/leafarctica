function constrainMapToBounds(map, crs, point) {
  map.on('move', function(e) {
    // Unproject the point for the current zoom level
    var maxPxPoint = map.project(crs.projection.unproject(point));

    // Get the current pixel bounds
    var b = map.getPixelBounds();

    // Do we break any of the pixel bounds constraints
    if(b.min.x < 0 || b.min.y < 0 || b.max.x > maxPxPoint.x || b.max.y > maxPxPoint.y){
      var x, y;

      // The bounds of the map container
      var elB = document.querySelector('#map').getBoundingClientRect();

      if(maxPxPoint.x < elB.width) {
        // Map is smaller than container width
        x = (maxPxPoint.x/2)
      }
      else if(b.min.x < 0) {
        // Less than min
        x = elB.width/2
      }
      else if(b.max.x > maxPxPoint.x) {
        // Greater than max
        x = maxPxPoint.x-(elB.width/2)
      }
      else {
        // Get current
        x = map.project(map.getCenter()).x;
      }

      if(maxPxPoint.y < elB.height) {
        // Map is smaller than container height
        y = (maxPxPoint.y/2)
      }
      else if(b.min.y < 0) {
        // Less than min
        y = elB.height/2
      }
      else if(b.max.y > maxPxPoint.y) {
        // Greater than max
        y = maxPxPoint.y-(elB.height/2)
      }
      else {
        // Get current
        y = map.project(map.getCenter()).y;
      }

      // Reset the map position
      var pos = map.unproject(L.point(x, y));
      map.setView(pos, map.getZoom(), {
        // No animation because we are already scrolling
        animate:false
      });
    }

  });
}
