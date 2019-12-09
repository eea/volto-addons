/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */
import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import 'draft-js-alignment-plugin/lib/plugin.css';
import { settings } from '~/config';
import './style.css';

/**
 * View text block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  return (
    <div>
      {data.text
        ? redraft(data.text, settings.ToHTMLRenderers, settings.ToHTMLOptions)
        : ''}
    </div>
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
