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

import CustomNavigation from './PDFNavigation';
import './pdf-styling.css';

import zoomInSVG from '@plone/volto/icons/add.svg';
import zoomOutSVG from '@plone/volto/icons/remove.svg';
import downloadSVG from '@plone/volto/icons/move-down.svg';

const LoadablePDFViewer = Loadable({
  loader: () => import('mgr-pdf-viewer-react'),
  loading() {
    return <div>Loading PDF file...</div>;
  },
});


class PDFView extends Component {
  state = {
    scale: 1.0,
    scale_ratio: 100,
  }

  increaseScale = () => this.setState(({ scale, scale_ratio }) => ({
    scale: scale + 0.1,
    scale_ratio: scale_ratio + 10
  }))
  decreaseScale = () => this.setState(({ scale, scale_ratio }) => ({
    scale: scale - 0.1,
    scale_ratio: scale_ratio - 10
  }))

  render () {
    const { data, detached } = this.props;
    const dataUrl =
     (data.url &&
       (data.url.includes(settings.apiPath)
         ? `${flattenToAppURL(data.url)}/@@download/file`
         : data.url)) ||
     null;

    return (
      <div>
        {data.url && (
         <>
           {(() => {
             return (
               <div>
                 <div>
                   <h2 className="pdf-title">{data.url.split('/').slice(-1)[0]}</h2>
                 </div>
                 <div className="pdf-toolbar pdf-toolbar-top">
                   <div>
                     <button className="pdf-toolbar-btn" title="Zoom In"
                       onClick={this.increaseScale}>
                       <Icon name={zoomInSVG} size="15px" />
                     </button>
                     <div className="scale-separator"></div>
                     <button className="pdf-toolbar-btn" title="Zoom Out"
                       onClick={this.decreaseScale}>
                       <Icon name={zoomOutSVG} size="15px" />
                     </button>
                     <p className="scale-ratio">{this.state.scale_ratio + '%'}</p>
                   </div>
                  <div>
                    <a href={dataUrl}>
                      <button className="pdf-toolbar-btn" title="Download">
                        <Icon name={downloadSVG} size="15px" />
                      </button>
                    </a>
                  </div>
                 </div>

                 <LoadablePDFViewer
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
      </div>
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
