import chartIcon from '@plone/volto/icons/world.svg';
import HiddenWidget from './Widgets/Hidden';

import PDFBlockView from './PDFViewer/BlockView';
import PDFBlockEdit from './PDFViewer/BlockEdit';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

import CollectionBlockView from './Collection/BlockView';
import CollectionBlockEdit from './Collection/BlockEdit';
import CollectionView from './Collection/View';
import FacetsConfigurationWidget from './Collection/FacetsWidget';

import * as addonReducers from './reducers';

export function applyConfig(config) {
  // Override the default blocks widget to hide it
  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;

  config.widgets.id.facets = FacetsConfigurationWidget;

  config.views.contentTypesViews.Collection = CollectionView;

  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(
    el => el.id === 'custom_addons',
  );
  if (!hasCustomGroup.length) {
    config.blocks.groupBlocksOrder.push({
      id: 'custom_addons',
      title: 'Custom addons',
    });
  }

  config.blocks.blocksConfig.collection_block = {
    id: 'collection_block',
    title: 'Collection Listing',
    view: CollectionBlockView,
    edit: CollectionBlockEdit,
    icon: chartIcon,
    group: 'custom_addons',
  };

  config.blocks.blocksConfig.pdf_viewer = {
    id: 'pdf_viewer',
    title: 'PDF Viewer',
    view: PDFBlockView,
    edit: PDFBlockEdit,
    icon: chartIcon,
    group: 'custom_addons',
  };

  config.addonReducers = {
    ...config.addonReducers,
    ...addonReducers,
  };

  return config;
}

export function installTableau(config) {
  config.blocks.blocksConfig.tableau = {
    id: 'tableau',
    title: 'Tableau',
    view: TableauBlockView,
    edit: TableauBlockEdit,
    icon: chartIcon,
    group: 'custom_addons',
  };
  return config;
}
