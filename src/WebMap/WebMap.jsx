
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';


const WebMap = props => {
  const mapRef = useRef();

  const options = {
    css: true,
  }

  const modules = [
    'esri/views/MapView', 'esri/WebMap', 'esri/widgets/Legend'
  ]

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(modules, options)
        .then(([MapView, WebMap, Legend]) => {

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
            // center: [-118, 34],
            // zoom: 8,
          });

          view.when(() => {
            var featureLayer = webmap.layers.getItemAt(0);

            const legend = new Legend({
              view: view,
              layerInfos: [{
                layer: featureLayer,
                title: 'Legend',
              }]
            })
            if (props.legend) {

              view.ui.add(legend, 'top-left');
            }
          })


          const url = 'https://cors-anywhere.herokuapp.com/https://eea.maps.arcgis.com/home/webmap/viewer.html?webmap=5a9916df66814405afcd678ed445c45f'

          // return () => {
          //   if (view) {
          //     // destroy the map view
          //     view.container = null;
          //   }
          // };
          // return esriRequest(`${url}/legend`, {
          //   query: { f: 'json' },
          //   responseType: 'json'
          // }).then(response => { console.log(response) }, error => { console.log(error) })


        });
    }
  );

  return (
    ///remember to change this inline style
    <div style={{ height: '700px' }} className="webmap" ref={mapRef} />
  );
}

export default WebMap;

