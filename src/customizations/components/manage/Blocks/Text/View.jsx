/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */
import React from 'react';
import PropTypes from 'prop-types';
import 'draft-js-alignment-plugin/lib/plugin.css';
import { settings } from '~/config';
import './style.css';

import Loadable from 'react-loadable';

const redraft = Loadable({
  loader: () => import('redraft'),
  loading() {
    return <div>Loading...</div>;
  },
});


const View = ({ data }) => {
  console.log('draft state', data);
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
