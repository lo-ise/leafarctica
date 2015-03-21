function init(){

	var crs = new L.Proj.CRS('EPSG:3031', '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
		resolutions: [
		  8192, 4096, 2048, 1024, 512, 256
		],
		//origin: [-6413800.0, -4157350.0],
                origin: [-4194304, 4194304],
		/*bounds: L.bounds(
		    [
		     4351685.893,
		     -3543625.914
		     ],
	            [
		     -3852939.790,
		     4313100.447
		     ]
		)*/
                bounds: L.bounds (
                    [-4194304, -4194304],
                    [4194304, 4194304]
                )

	});
       
        var template =
            "http://map1{s}.vis.earthdata.nasa.gov/wmts-antarctic/" +
            "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

        var modisLayer = L.tileLayer(template, {
            layer: "MODIS_Aqua_CorrectedReflectance_TrueColor",
            tileMatrixSet: "EPSG3031_250m",
            format: "image%2Fjpeg",
            time: "2014-12-19",
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



	var myLayer = new L.TileLayer.WMS("http://192.168.1.68/qgis-mapserv/qgis_mapserv.fcgi", {
            map: "/Users/Ireland/qgis-dev/leaflet-learning/seaice.qgs",
	    layers: 'nt_20070402_f17_v01_s',
	    format: 'image/png',
	    continuousWorld: true,
	});

	var coastLayer = new L.TileLayer.WMS("http://192.168.1.68/qgis-mapserv/qgis_mapserv.fcgi", {
            map: "/Users/Ireland/qgis-dev/leaflet-learning/seaice.qgs",
	    layers: 'cst00_polygon',
	    format: 'image/png',
	    continuousWorld: true,
	    transparent: true
	});

        window.coastLayer = coastLayer

	var map = new L.Map('map', {
	    continuousWorld: true,
	    worldCopyJump: false,
	    layers: [modisLayer],
	    center: [-90, 0],
	    zoom: 0,
            crs: crs
	});

	window.map = map
        var hash = new L.Hash(map);
	L.graticule().addTo(map);
        //var miniMap = new L.Control.MiniMap(modisLayer).addTo(map);
	//map.setView([-90,0], 0);
}

document.addEventListener("DOMContentLoaded",init)
