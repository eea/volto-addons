/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import Loadable from 'react-loadable';

import CustomNavigation, {
  CustomPrevButton,
  CustomNextButton,
  CustomPages,
} from './PDFNavigation';

import './pdf-styling.css';

import zoomInSVG from '@plone/volto/icons/add.svg';
import zoomOutSVG from '@plone/volto/icons/remove.svg';

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
               <div className="pdf-top-toolbar">
                 <button className= "scale-btn"
                         onClick={this.increaseScale}>
                  <Icon name={zoomInSVG} size="15px" />
                </button>
                <div className="scale-separator"></div>
                 <button className= "scale-btn"
                         onClick={this.decreaseScale}>
                  <Icon name={zoomOutSVG} size="15px" />
                 </button>
               </div>
               <LoadablePDFViewer
                 className={cx({ 'full-width': data.align === 'full' })}
                 document={{
                   url: dataUrl,
                 }}
                 scale={this.state.scale}
                 css='pdf-viewer'
                 navigation={CustomNavigation}
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
