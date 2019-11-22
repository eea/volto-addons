import chartIcon from '@plone/volto/icons/world.svg';
import HiddenWidget from './Widgets/Hidden';

import PDFBlockView from './PDFViewer/BlockView';
import PDFBlockEdit from './PDFViewer/BlockEdit';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

export function applyConfig(config) {
  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;

  config.blocks.blocksConfig.pdf_viewer = {
    id: 'pdf_viewer',
    title: 'PDF Viewer',
    view: PDFBlockView,
    edit: PDFBlockEdit,
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
