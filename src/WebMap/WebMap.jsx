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
    'esri/layers/FeatureLayer',
    'esri/PopupTemplate',
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
        FeatureLayer,
        PopupTemplate,
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

        var featureLayerSites = new FeatureLayer({
          url:
            'https://services.arcgis.com/LcQjj2sL7Txk9Lag/arcgis/rest/services/ly_IED_SiteMap_WM/FeatureServer/0',
          // popupTemplate: new PopupTemplate({
          //   // autocasts as new PopupTemplate()
          //   title: '{sitename}',
          //   // overwriteActions: true,
          // }),
        });
        var selectFilter = document.createElement('select');
        selectFilter.setAttribute('class', 'esri-widget esri-select');
        selectFilter.setAttribute(
          'style',
          'width: 275px; font-family: Avenir Next W00; font-size: 1em;',
        );

        var sqlExpressions = [
          'rep_yr = 2020',
          'rep_yr = 2017',
        ];

        sqlExpressions.forEach(function(sql) {
          var option = document.createElement('option');
          option.value = sql;
          option.innerHTML = sql;
          selectFilter.appendChild(option);
        });

        function setFeatureLayerViewFilter(expression) {
          view
            .whenLayerView(featureLayerSites)
            .then(function(featureLayerView) {
              featureLayerView.filter = {
                where: expression,
              };
            });
        }

        view.ui.add(selectFilter, 'top-right');

        selectFilter.addEventListener('change', function(event) {
          // setFeatureLayerFilter(event.target.value);
          setFeatureLayerViewFilter(event.target.value);
        });

        var customSearchSource = {
          layer: featureLayerSites,
          searchFields: ['sitename'],
          suggestionTemplate: '{sitename}',
          exactMatch: false,
          outFields: ['*'],
          placeholder: 'example: 110DJ0000.SITE',
          name: 'sites',
          zoomScale: 0.1,
          // resultSymbol: {
          //   type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          //   url: "images/senate.png",
          //   height: 36,
          //   width: 36
          // }
          // resultSymbol: {
          //   type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          //   url:
          //     'https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-multiplesource/live/images/senate.png',
          //   height: 36,
          // },
        };

        const search = new Search({
          map: view,
          searchAllEnabled: true,
          // sources: [customSearchSource]
        });

        const sources = search.get('sources');
        console.log('sources', sources);
        sources.push(customSearchSource);
        sources.set('sources', sources);
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
            console.log(event);
            if (event.results[0].results[0].extent) {
              console.log('in if');
              view.goTo(event.results[0].results[0]);
            } else {
              console.log('in else');
              view.goTo({
                target: event.results[0].results[0].feature.geometry,
                zoom: 15,
                popup: 'open',
              });
            }
          });

          console.log('layer list', view.map.layers);
          console.log('search', Search);
          //edit main layer's sublayer definition expression (Filter)
          // if (props.filter) {
          //   var imgLayer = new MapImageLayer({
          //     url: mainLayer.url,
          //     sublayers: [
          //       {
          //         id: 0,
          //         visible: true,
          //         definitionExpression: `NUTS0 = '${props.filter}'`,
          //       },
          //     ],
          //   });
          //   console.log('imglayer', imgLayer);
          //   view.map.layers.add(imgLayer);
          // }

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
