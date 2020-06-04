import React from 'react';
import PropTypes from 'prop-types';
import { blocks as customBlocks } from '~/config';
import TemplateWidget from './TemplateWidget';

const RssStyle = ({
  data,
  block,
  onChangeBlock,
  setTemplate,
  required = false,
}) => {
  const templatesConfig = customBlocks.blocksConfig.rssBlock.templates;
  if (templatesConfig && Object.keys(templatesConfig).length > 1) {
    return (
      <>
        <div className="sidebar-listing-data listing-style">
          <TemplateWidget
            data={data}
            block={block}
            onChangeBlock={onChangeBlock}
            setTemplate={setTemplate}
            required={required}
          />
        </div>
      </>
    );
  }

  return null;
};

RssStyle.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  setTemplate: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default RssStyle;
