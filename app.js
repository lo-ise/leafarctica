function init(){

	var crs = new L.Proj.CRS('EPSG:3031', '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
		resolutions: [
		  8192, 4096, 2048, 1024, 512, 256
		],
                origin: [-4194304, 4194304],
                bounds: L.bounds (
                    [-4194304, -4194304],
                    [4194304, 4194304]
                )
	});
       
        var template =
            "http://map1{s}.vis.earthdata.nasa.gov/wmts-antarctic/" +
            "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

        function genModisLayer(time){
		return L.tileLayer(template, {
		    layer: "MODIS_Aqua_CorrectedReflectance_TrueColor",
		    tileMatrixSet: "EPSG3031_250m",
		    format: "image%2Fjpeg",
		    time: time,
		    tileSize: 512,
		    subdomains: "abc",
		    noWrap: true,
		    continuousWorld: true,
		    attribution:
			"<a href='https://earthdata.nasa.gov/gibs'>" +
			"NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
			"<a href='https://github.com/nasa-gibs/web-examples/blob/release/leaflet/js/antarctic-epsg3031.js'>" +
			"View Source" +
			"</a>"
		});
	}

	var el = document.querySelector('#date')
	el.addEventListener('change', function(){
	    map.removeLayer(modisLayer)
            console.log(el.value)
	    modisLayer = genModisLayer(el.value)
	    map.addLayer(modisLayer)
	})

	var modisLayer = genModisLayer('2014-12-01')
        el.value = '2014-12-01'


	var map = new L.Map('map', {
	    continuousWorld: true,
	    worldCopyJump: false,
	    layers: [modisLayer],
	    center: [-90, 0],
	    zoom: 0,
            crs: crs
	});

	
	window.map = map;
        
	var hash = new L.Hash(map);
	L.graticule().addTo(map);
        
	window.crs = crs;	
	var southWest = crs.projection.unproject({x:-4194304, y:-4194304}); 
	var northEast = crs.projection.unproject({x:4194304, y:4194304});
	
	map.setMaxBounds(new L.LatLngBounds(southWest, northEast));



}

document.addEventListener("DOMContentLoaded",init)
