import chartIcon from '@plone/volto/icons/world.svg';
import HiddenWidget from './Widgets/Hidden';

import PDFBlockView from './PDFViewer/BlockView';
import PDFBlockEdit from './PDFViewer/BlockEdit';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

import CollectionBlockView from './Collection/BlockView';
import CollectionBlockEdit from './Collection/BlockEdit';
import CollectionView from './Collection/View';

import FolderListingBlockView from './FolderListing/BlockView';
import FolderListingBlockEdit from './FolderListing/BlockEdit';
import ControlPanelViewlet from './ControlPanel/Viewlet';

import EditSlider from './ImageSlider/Edit';

import TextEdit from './customizations/components/manage/Blocks/Text/Edit';
import TextView from './customizations/components/manage/Blocks/Text/View';

import PortletManagerRenderer from './Portlets/PortletManagerRenderer';

import { View } from '@plone/volto/components';

import * as addonReducers from './reducers';

import { CodeBlockButton } from 'draft-js-buttons';

import {
  Strikethrough,
  HeaderOne,
  HeaderTwo,
  HeaderThree,
  AlignLeft,
  AlignCenter,
  AlignRight,
  inlineRenderers,
  styleMap,
  customBlockStyleFn,
} from 'volto-addons/styleConfig';
import { HeaderFour } from './styleConfig';

export function applyConfig(config) {
  config.blocks.blocksConfig.text = {
    id: 'text',
    title: 'Text',
    view: TextView,
    edit: TextEdit,
    icon: chartIcon,
    group: 'text',
  };
  config.settings.blockStyleFn = customBlockStyleFn;
  config.settings.customStyleMap = styleMap;
  config.settings.richTextEditorInlineToolbarButtons = [
    Strikethrough,
    CodeBlockButton,
    AlignLeft,
    AlignCenter,
    AlignRight,
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    HeaderFour,
    ...config.settings.richTextEditorInlineToolbarButtons,
  ].filter((button, index) => index !== 13 && index !== 14);

  config.settings.ToHTMLRenderers = {
    ...config.settings.ToHTMLRenderers,
    inline: {
      ...config.settings.ToHTMLRenderers.inline,
      ...inlineRenderers,
    },
  };

  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;
  config.views.contentTypesViews.Collection = CollectionView;
  config.addonViewlets = [
    {
      path: '/controlpanel',
      component: ControlPanelViewlet,
    },
    ...(config.addonViewlets || []),
  ];

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

  config.views.layoutViews.compositepage_view = View;

  return config;
}

export function installCustomAddonGroup(config) {
  const hasCustomGroup = config.blocks.groupBlocksOrder.filter(
    el => el.id === 'custom_addons',
  );
  if (!hasCustomGroup.length) {
    config.blocks.groupBlocksOrder.push({
      id: 'custom_addons',
      title: 'Custom addons',
    });
  }
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
  config.portletManagers = {
    default: PortletManagerRenderer,
  };
  return config;
}
