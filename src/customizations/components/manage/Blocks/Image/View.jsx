/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

import { Icon } from '@plone/volto/components';
import ImageFull from '@plone/volto/icons/image-full.svg';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => {
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const trigger = (
    <div
      style={{
        position: 'absolute',
        // marginTop: '-2.2rem',
        color: 'white',
        cursor: 'pointer',
        margin: '.5rem',
        transition: '100ms opacity',
        opacity: hovered ? '1' : '0',
        filter: 'drop-shadow(rgb(68, 68, 68) 1px 1px 3px)',
        background: 'rgb(68, 68, 68)',
        height: '25px',
      }}
      onClick={(e) => e.preventDefault}
      onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false
    >
      <Icon
        onClick={() => {
          setModalOpen(true);
          setZoomed(true);
        }}
        name={ImageFull}
        size="24px"
      />
    </div>
  );
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
            const image = (
              <React.Fragment>
                <img
                  className={cx({ 'full-width': data.align === 'full' })}
                  style={{
                    width: data.width ? data.width + 'px' : 'auto',
                    height: data.height ? data.height + 'px' : 'auto',
                    marginLeft:
                      data.inLeftColumn && data.width
                        ? `-${parseInt(data.width) + 10}px`
                        : '0',
                    marginRight: data.inLeftColumn ? '0!important' : '1rem',
                  }}
                  src={
                    data.url.includes(config.settings.apiPath)
                      ? `${flattenToAppURL(data.url)}/@@images/image`
                      : data.url
                  }
                  onClick={() => setZoomed(true)}
                  alt={data.alt || ''}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                ></img>
                <Modal
                  style={{ width: 'unset' }}
                  open={modalOpen}
                  onClose={() => {
                    setZoomed(false);
                    setModalOpen(false);
                    setHovered(false);
                  }}
                >
                  <Modal.Content image>
                    <img
                      className={cx({ 'full-width': data.align === 'full' })}
                      zoomed={zoomed}
                      style={{ maxHeight: '80vh', maxWidth: '100%' }}
                      src={
                        data.url.includes(config.settings.apiPath)
                          ? `${flattenToAppURL(data.url)}/@@images/image`
                          : data.url
                      }
                      onClick={() => setZoomed(true)}
                      alt={data.alt || ''}
                      onMouseLeave={() => setHovered(false)}
                    ></img>
                  </Modal.Content>
                </Modal>
              </React.Fragment>
            );
            if (data.href) {
              if (
                (data.href.startsWith('http') ||
                  data.href.startsWith('https')) &&
                !data.href.includes(config.settings.apiPath)
              ) {
                return (
                  <React.Fragment>
                    <a
                      target={data.openLinkInNewTab ? '_blank' : null}
                      href={data.href}
                    >
                      {image}
                    </a>
                    {trigger}
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment>
                    <Link
                      to={data.href.replace(config.settings.apiPath, '')}
                      target={data.openLinkInNewTab ? '_blank' : null}
                    >
                      {image}
                    </Link>
                    {trigger}
                  </React.Fragment>
                );
              }
            } else {
              return (
                <React.Fragment>
                  {image}
                  {trigger}
                </React.Fragment>
              );
            }
          })()}
        </>
      )}
    </p>
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
