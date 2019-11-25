/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';

import { flattenToAppURL } from '@plone/volto/helpers';

import Loadable from 'react-loadable';

const LoadablePDFViewer = Loadable({
  loader: () => import('mgr-pdf-viewer-react'),
  loading() {
    return <div>Loading PDF file...</div>;
  },
});


class PDFView extends Component {
  state = {
    scale: 1.0,
  }

  increaseScale = () => this.setState(({ scale }) => ({ scale: scale + 0.1 }))
  decreaseScale = () => this.setState(({ scale }) => ({ scale: scale - 0.1 }))

  render () {
    const { data, detached } = this.props;
    const dataUrl =
     (data.url &&
       (data.url.includes(settings.apiPath)
         ? `${flattenToAppURL(data.url)}/@@download/file`
         : data.url)) ||
     null;

    return (
      <p
        className={cx(
         'block image align',
         {
           center: !Boolean(data.align),
           detached,
         },
         data.align,
        )}
      >
      {data.url && (
       <>
         {(() => {
           const dataUrl =
             (data.url &&
               (data.url.includes(settings.apiPath)
                 ? `${flattenToAppURL(data.url)}/@@download/file`
                 : data.url)) ||
             null;
           return (
             <div>
               <button onClick={this.decreaseScale}>-</button>
               <button onClick={this.increaseScale}>+</button>
               <LoadablePDFViewer
                 className={cx({ 'full-width': data.align === 'full' })}
                 document={{
                   url: dataUrl,
                 }}
                 scale={this.state.scale}
                />
             </div>
           );
         })()}
       </>
      )}
      </p>
    )
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
PDFView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PDFView;
