import HiddenWidget from './components/manage/Widgets/Hidden';

export function applyConfig(config) {
  return {
    ...config,
    widgets: {
      ...config.widgets,
      id: {
        ...config.widgets.id,
        blocks: HiddenWidget,
        blocks_layout: HiddenWidget,
      },
    },
  };
}
