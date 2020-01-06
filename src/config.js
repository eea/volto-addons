import chartIcon from '@plone/volto/icons/world.svg';
import HiddenWidget from './Widgets/Hidden';
import CollectionYears from './Widgets/CollectionYears';

import PDFBlockView from './PDFViewer/BlockView';
import PDFBlockEdit from './PDFViewer/BlockEdit';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

import CollectionBlockView from './Collection/BlockView';
import CollectionBlockEdit from './Collection/BlockEdit';
import CollectionView from './Collection/View';

import MapView from './Map/View';

import FolderListingBlockView from './FolderListing/BlockView';
import FolderListingBlockEdit from './FolderListing/BlockEdit';
import ControlPanelViewlet from './ControlPanel/Viewlet';

import EditSlider from './ImageSlider/Edit';

import { View } from '@plone/volto/components';

import * as addonReducers from './reducers';
import installDraftEditor from './drafteditor';

import {
  NavigationPortlet,
  DefaultPortlet,
  PortletManagerRenderer,
  ClassicPortlet,
} from './Portlets';

function addCustomGroup(config) {
  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(
    el => el.id === 'custom_addons',
  );
  if (!hasCustomGroup.length) {
    config.blocks.groupBlocksOrder.push({
      id: 'custom_addons',
      title: 'Custom addons',
    });
  }
}

export function applyConfig(config) {
  addCustomGroup(config);
  installDraftEditor(config); // BBB

  config.views.contentTypesViews.Collection = CollectionView;
  config.views.contentTypesViews.EmbeddedMap = MapView;
  config.views.contentTypesViews.embeddedmap = MapView;
  config.views.layoutViews.compositepage_view = View;

  config.widgets.id.collection_years = CollectionYears;
  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;

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

  config.viewlets = [
    {
      path: '/controlpanel',
      component: ControlPanelViewlet,
    },
    ...(config.viewlets || []),
  ];

  return config;
}

export function installFolderListing(config) {
  config.blocks.blocksConfig.folder_contents_block = {
    id: 'folder_contents_block',
    title: 'Folder Contents',
    view: FolderListingBlockView,
    edit: FolderListingBlockEdit,
    icon: chartIcon,
    group: 'custom_addons',
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

export function installImageSlides(config) {
  config.addonRoutes = [
    {
      path: '/manage-slider',
      component: EditSlider,
    },
    {
      path: '*/**/manage-slider',
      component: EditSlider,
    },
    ...(config.addonRoutes || []),
  ];
  return config;
}

export function installPortlets(config) {
  config.portlets = {
    managers: {
      ...config.portlets?.managers,
      default: PortletManagerRenderer,
    },
    renderers: {
      'portlets.Navigation': NavigationPortlet,
      'portlets.Classic': ClassicPortlet,
      default: DefaultPortlet,
    },
  };
  return config;
}
