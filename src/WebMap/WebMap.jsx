/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';

const WebMap = props => {
  const mapRef = useRef();

  const options = {
    css: true,
  };

  const modules = [
    'esri/views/MapView',
    'esri/WebMap',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    'esri/widgets/CoordinateConversion',
    'esri/config',
    'esri/layers/MapImageLayer',
    // 'esri/map',
    'esri/widgets/Search',
  ];

  useEffect(() => {
    console.log('gottareloadbecauseofreasons');
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(modules, options).then(
      ([
        MapView,
        WebMap,
        Legend,
        LayerList,
        CoordinateConversion,
        esriConfig,
        MapImageLayer,
        Search,
      ]) => {
        esriConfig.portalUrl = props.portalUrl ? props.portalUrl : '';

        // then we load a web map from an id
        const webmap = new WebMap({
          portalItem: {
            id: props.mapId,
          },
        });

        // load the map view at the ref's DOM node
        const view = new MapView({
          container: mapRef.current,
          map: webmap,
        });
        console.log('search in view', webmap, view);

        const search = new Search({
          map: view,
          searchAllEnabled: true,
        });
        view.ui.add(search, 'top-right');

        // search.goToOverride = function(view, goToParams) {
        //   // goToParams.options.duration = updatedDuration;
        //   console.log('search goto', view, goToParams)
        //   return view.goTo(goToParams.target, goToParams.options);
        // };
        //coordinates tracking widget
        if (props.showCoordWidget) {
          var ccWidget = new CoordinateConversion({
            view: view,
          });

          view.ui.add(ccWidget, 'bottom-left');
        }

        //watch for zoom
        if (props.zoom) {
          view.zoom = props.zoom;
        }

        //watch for lat/long changes
        if (props.latitude && props.longitude) {
          view.center = [props.latitude, props.longitude];
        }

        //Layers Visible
        if (props.showLayers) {
          console.log('layers', props.showLayers);
          var layerList = new LayerList({
            view: view,
          });

          view.ui.add(layerList, {
            position: 'top-right',
          });
        }

        view.when(() => {
          var mainLayer = view.map.layers.getItemAt(0);

          search.on('search-complete', function(event) {
            // The results are stored in the event Object[]
            view.goTo(event.results[0].results[0]);
          });

          console.log('layer list', view.map.layers);
          console.log('search', Search);
          //edit main layer's sublayer definition expression (Filter)
          if (props.filter) {
            var imgLayer = new MapImageLayer({
              url: mainLayer.url,
              sublayers: [
                {
                  id: 0,
                  visible: true,
                  definitionExpression: `NUTS0 = '${props.filter}'`,
                },
              ],
            });
            console.log('imglayer', imgLayer);
            view.map.layers.add(imgLayer);
          }

          //add legend
          if (props.showLegend) {
            const legend = new Legend({
              view: view,
              layerInfos: [
                {
                  layer: mainLayer,
                  title: 'Legend',
                },
              ],
            });

            view.ui.add(legend, 'top-left');
          }
        });
      },
    );
  }, [
    props.filter,
    props.mapId,
    props.showLegend,
    props.showLayers,
    props.showCoordWidget,
    props.zoom,
    props.portalUrl,
    props.latitude,
    props.longitude,
  ]);

  return <div style={{ height: '700px' }} className="webmap" ref={mapRef} />;
};

export default WebMap;
