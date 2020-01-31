/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'draft-js-alignment-plugin/lib/plugin.css';
import { settings } from '~/config';
import './style.css';

import redraft from 'redraft';

const View = ({ data }) => {
  return data && data.text ? (
    <div>
      {redraft(data.text, settings.ToHTMLRenderers, settings.ToHTMLOptions)}
    </div>
  ) : (
    <p> </p>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
