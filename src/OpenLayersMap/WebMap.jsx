/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import 'ol/ol.css';
import Map from 'ol/Map';
// import View from 'ol/View';
// import EsriJSON from 'ol/format/EsriJSON';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
// import {tile as tileStrategy} from 'ol/loadingstrategy';
// import {fromLonLat} from 'ol/proj';
// import VectorSource from 'ol/source/Vector';
// import XYZ from 'ol/source/XYZ';
// import {Fill, Stroke, Style, Circle as CircleStyle} from 'ol/style';
// import {createXYZ} from 'ol/tilegrid';
// import LayerSwitcher from 'ol-layerswitcher';

// import {
//   interaction,
//   layer,
//   custom,
//   control, //name spaces
//   Interactions,
//   Overlays,
//   Controls, //group
//   Map,
//   Layers,
//   Overlay,
//   Util, //objects
//   View,
//   EsriJSON,
//   Tile as TileLayer,
//   Vector as VectorLayer,
//   tile as tileStrategy,
//   fromLonLat,
//   VectorSource,
//   XYZ,
// } from 'react-openlayers';

const WebMap = ({ layerUrl }) => {

  console.log('tilelayer', Map, View);

  return <div>{JSON.stringify(layerUrl)}</div>;
};

export default WebMap;

// var serviceUrl1 = 'https://services.arcgis.com/LcQjj2sL7Txk9Lag/arcgis/rest/services/ly_IED_SiteMap_WM/FeatureServer/';
// var serviceUrl2 = 'https://services.arcgis.com/LcQjj2sL7Txk9Lag/ArcGIS/rest/services/ly_IED_SiteClusters_WM/FeatureServer/';
// var layer = '0';

// var esrijsonFormat = new EsriJSON();

// var vectorSource1 = new VectorSource({
//   loader: function(extent, resolution, projection) {
//     var url = serviceUrl1 + layer + '/query/?f=json&' +
//         'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
//         encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
//             extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
//             ',"spatialReference":{"wkid":102100}}') +
//         '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
//         '&outSR=102100';
//     $.ajax({url: url, dataType: 'jsonp', success: function(response) {
//       if (response.error) {
//         alert(response.error.message + '\n' +
//             response.error.details.join('\n'));
//       } else {
//         // dataProjection will be read from document
//         var features = esrijsonFormat.readFeatures(response, {
//           featureProjection: projection
//         });
//         if (features.length > 0) {
//           vectorSource1.addFeatures(features);
//         }
//       }
//     }});
//   },
//   strategy: tileStrategy(createXYZ({
//     tileSize: 512
//   }))
// });

// var vectorSource2 = new VectorSource({
//   loader: function(extent, resolution, projection) {
//     var url = serviceUrl2 + layer + '/query/?f=json&' +
//         'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
//         encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
//             extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
//             ',"spatialReference":{"wkid":102100}}') +
//         '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
//         '&outSR=102100';
//     $.ajax({url: url, dataType: 'jsonp', success: function(response) {
//       if (response.error) {
//         alert(response.error.message + '\n' +
//             response.error.details.join('\n'));
//       } else {
//         // dataProjection will be read from document
//         var features = esrijsonFormat.readFeatures(response, {
//           featureProjection: projection
//         });
//         if (features.length > 0) {
//           vectorSource2.addFeatures(features);
//         }
//       }
//     }});
//   },
//   strategy: tileStrategy(createXYZ({
//     tileSize: 512
//   }))
// });

// var vector1 = new VectorLayer({
//   source: vectorSource1,
//   style: new Style({
//     image: new CircleStyle({
//       radius: 3,
//       fill: new Fill({color: '#666666'}),
//       stroke: new Stroke({color: '#bada55', width: 1})
//     })
//   })
// });

// var vector2 = new VectorLayer({
//   source: vectorSource2,
//   style: new Style({
//     image: new CircleStyle({
//       radius: 3,
//       fill: new Fill({color: '#dd1111'}),
//       stroke: new Stroke({color: '#bada55', width: 1})
//     })
//   })
// });

// var raster = new TileLayer({
//   source: new XYZ({
//     url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
//         'Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
//         //'Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}'
//   }),
//   type: 'base'
// });

// var map = new Map({
//   layers: [raster, vector1, vector2],
//   target: document.getElementById('map'),
//   view: new View({
//     center: fromLonLat([25, 46]),
//     zoom: 6
//   })
// });

// var displayFeatureInfo = function(pixel) {
//   var features = [];
//   map.forEachFeatureAtPixel(pixel, function(feature) {
//     features.push(feature);
//   });
//   if (features.length > 0) {
//     var info = [];
//     var i, ii;
//     for (i = 0, ii = features.length; i < ii; ++i) {
//       console.log(features[i]);
//       info.push(features[i].values_);
//     }
//     document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
//     map.getTarget().style.cursor = 'pointer';
//   } else {
//     document.getElementById('info').innerHTML = '&nbsp;';
//     map.getTarget().style.cursor = '';
//   }
// };

// map.on('pointermove', function(evt) {
//   if (evt.dragging) {
//     return;
//   }
//   var pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });

// map.on('click', function(evt) {
//   displayFeatureInfo(evt.pixel);
// });
