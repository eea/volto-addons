import chartIcon from '@plone/volto/icons/world.svg';
import HiddenWidget from './Widgets/Hidden';

import TableauBlockView from './Tableau/BlockView';
import TableauBlockEdit from './Tableau/BlockEdit';

export function applyConfig(config) {
  config.widgets.id.blocks = HiddenWidget;
  config.widgets.id.blocks_layout = HiddenWidget;
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
