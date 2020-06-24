import chartIcon from '@plone/volto/icons/world.svg';
import codeSVG from '@plone/volto/icons/code.svg';

import HiddenWidget from './Widgets/Hidden';
import CollectionYears from './Widgets/CollectionYears';
import PickObject from './PickObject';
import ObjectListWidget from './Widgets/ObjectList';
import AlignBlockWidget from './Widgets/Align';
import AttachedImageWidget from './Widgets/AttachedImage';
import TemplatingToolbarWidget from './Widgets/TemplatingToolbar';

import PDFBlockView from './PDFViewer/BlockView';
import PDFBlockEdit from './PDFViewer/BlockEdit';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

import NewsView from './News/NewsView';
import NewsEdit from './News/NewsEdit';

import CollectionBlockView from './Collection/BlockView';
import CollectionBlockEdit from './Collection/BlockEdit';
import CollectionView from './Collection/View';

import MapView from './Map/View';

import FolderListingBlockView from './FolderListing/BlockView';
import FolderListingBlockEdit from './FolderListing/BlockEdit';
import ControlPanelViewlet from './ControlPanel/Viewlet';

import ImageCardsView from './ImageCards/ImageCardsView';
import ImageCardsEdit from './ImageCards/ImageCardsEdit';

import WebMapBlockView from './WebMap/BlockView';
import WebMapBlockEdit from './WebMap/BlockEdit';

import ConnectedMapView from './ConnectedMap/BlockView';
import ConnectedMapEdit from './ConnectedMap/BlockEdit';

import ConnectedControl from './ConnectedControl/ConnectedControl';

// import { View } from '@plone/volto/components';

import * as addonReducers from './reducers';
import installDraftEditor from './drafteditor';

import {
  NavigationPortlet,
  DefaultPortlet,
  PortletManagerRenderer,
  ClassicPortlet,
} from './Portlets';

function addCustomGroup(config) {
  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(el => {
    return el.id === 'custom_addons';
  });
  if (hasCustomGroup.length === 0) {
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
  // config.views.layoutViews.compositepage_view = View;

  config.widgets.id.collection_years = CollectionYears;
  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;
  config.widgets.id.templatingtoolbar = TemplatingToolbarWidget;

  config.widgets.widget.sidebar = [TemplatingToolbarWidget];

  config.widgets.widget.object_by_path = PickObject;
  config.widgets.widget.objectlist = ObjectListWidget;
  config.widgets.widget.align = AlignBlockWidget;
  config.widgets.widget.attachedimage = AttachedImageWidget;

  config.blocks.blocksConfig.connected_map = {
    id: 'connected_map',
    title: 'Connected Map',
    view: ConnectedMapView,
    edit: ConnectedMapEdit,
    icon: chartIcon,
    group: 'custom_addons',
  };

  config.blocks.blocksConfig.connected_control = {
    id: 'connected_control',
    title: 'Connected Control',
    view: ConnectedControl,
    edit: ConnectedControl,
    icon: chartIcon,
    group: 'custom_addons',
  };

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

  config.blocks.blocksConfig.web_map = {
    id: 'web_map',
    title: 'Web Map',
    view: WebMapBlockView,
    edit: WebMapBlockEdit,
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

export function installNews(config) {
  config.blocks.blocksConfig.news = {
    id: 'news',
    title: 'News',
    view: NewsView,
    edit: NewsEdit,
    icon: chartIcon,
    group: 'custom_addons',
  };
  return config;
}

export function installImageSlides(config) {
  // config.addonRoutes = [
  //   {
  //     path: '/manage-slider',
  //     component: EditSlider,
  //   },
  //   {
  //     path: '*/**/manage-slider',
  //     component: EditSlider,
  //   },
  //   ...(config.addonRoutes || []),
  // ];

  config.blocks.blocksConfig.imagecards = {
    id: 'imagecards',
    title: 'Image Cards',
    icon: codeSVG,
    group: 'bise',
    view: ImageCardsView,
    edit: ImageCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

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
