
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';


const WebMap = props => {
  const mapRef = useRef();

  const options = {
    css: true,
  }

  const modules = [
    'esri/views/MapView', 'esri/WebMap', 'esri/widgets/Legend', 'esri/widgets/LayerList',
  ]

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(modules, options)
        .then(([MapView, WebMap, Legend, LayerList]) => {

          // then we load a web map from an id
          const webmap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
              id: props.mapId
            }
          });

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: webmap,
            // center: props.latitude && props.longitude ? [props.latitude, props.longitude] : [],
            // zoom: props.zoom ? props.zoom : ""
          });

          //watch for zoom
          if (props.zoom) {
            view.zoom = props.zoom
          }

          //watch for lat/long changes
          if (props.latitude && props.longitude) {
            view.center = [props.latitude, props.longitude]
          }

          //Filter by layers
          if (props.showFilters) {
            var layerList = new LayerList({
              view: view
            });

            view.ui.add(layerList, {
              position: "top-right"
            });
          }

          view.when(() => {
            var featureLayer = webmap.layers.getItemAt(0);

            const legend = new Legend({
              view: view,
              layerInfos: [{
                layer: featureLayer,
                title: 'Legend',
              }]
            })
            if (props.showLegend) {

              view.ui.add(legend, 'top-left');
            }
          })
        });
    }
  );

  return (
    ///remember to change this inline style
    <div style={{ height: '700px' }} className="webmap" ref={mapRef} />
  );
}

export default WebMap;

