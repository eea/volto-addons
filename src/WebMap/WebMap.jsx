
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';


const WebMap = props => {
  const mapRef = useRef();



  const options = {
    css: true,
  }

  const modules = [
    'esri/views/MapView',
    'esri/WebMap',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    "esri/widgets/CoordinateConversion",
    'esri/config',
    "esri/layers/MapImageLayer",
  ]

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(modules, options)
        .then(([MapView, WebMap, Legend, LayerList, CoordinateConversion, esriConfig, MapImageLayer]) => {

          esriConfig.portalUrl = "https://eea.maps.arcgis.com"
          // then we load a web map from an id

          const webmap = new WebMap({
            portalItem: {
              id: props.mapId
            }
          });


          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: webmap,
          });

          //coordinates tracking widget
          if (props.showCoordWidget) {
            var ccWidget = new CoordinateConversion({
              view: view
            });

            view.ui.add(ccWidget, "bottom-left");
          }

          //watch for zoom
          if (props.zoom) {
            view.zoom = props.zoom
          }

          //watch for lat/long changes
          if (props.latitude && props.longitude) {
            view.center = [props.latitude, props.longitude]
          }

          //Filter by layers
          if (props.showLayers) {
            var layerList = new LayerList({
              view: view
            });

            view.ui.add(layerList, {
              position: "top-right"
            });
          }

          view.when(() => {
            var mainLayer = view.map.layers.getItemAt(0);

            //edit main layer's sublayer definition expression
            if (props.filter) {
              var imgLayer = new MapImageLayer({
                url: mainLayer.url,
                sublayers: [
                  {
                    id: 0,
                    visible: true,
                    definitionExpression: `NUTS0 = '${props.filter}'`
                  }
                ]
              })

              view.map.layers.add(imgLayer)

            }

            //add legend
            if (props.showLegend) {
              const legend = new Legend({
                view: view,
                layerInfos: [{
                  layer: mainLayer,
                  title: 'Legend',
                }]
              })

              view.ui.add(legend, 'top-left');
            }
          })
        });
    }
  );

  return (
    <div style={{ height: '700px' }} className="webmap" ref={mapRef} />
  );
}

export default WebMap;

