/* REACT */
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Icon } from '@plone/volto/components';
import DOMPurify from 'dompurify';
import move from 'lodash-move';
import cx from 'classnames';
import dragSVG from '@plone/volto/icons/drag.svg';
import './style.css';
const View = ({ content, ...props }) => {
  const [state, setState] = useState({
    activeItem: '',
  });
  const isExpandable = props.data?.isExpandable;
  const listItemTitleClassname = props.data?.listItemTitleClassname;
  const listItemDescriptionClassname = props.data?.listItemDescriptionClassname;
  const listClassname = props.data?.listClassname;
  const items = props.data?.items || [];
  const ordered = props.data?.ordered;

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      props.onChangeBlock(props.block, {
        ...props.data,
        items: move(props.data.items, source.index, destination.index),
      });
    } else {
      //  WIP
    }
  };

  return (
    <div className={cx('expandable-list', listClassname)}>
      {props.mode === 'edit' && !items.length ? <p>Expandable list</p> : ''}
      {items
        ? Object.entries(items).map(([key, value], index) => (
            <div
              style={{
                position: 'relative',
                height: '100%',
              }}
            >
              <div
                style={{
                  visibility: 'visible',
                  display: 'inline-block',
                }}
                className="drag handle wrapper"
              >
                <Icon name={dragSVG} size="18px" />
              </div>
              <div className="list-item" key={`list-item-${key}`}>
                <button
                  className={cx(
                    'list-item-title',
                    listItemTitleClassname ? listItemTitleClassname : '',
                    isExpandable ? 'expandable' : 'no-expandable',
                  )}
                  onClick={() => {
                    if (isExpandable && state.activeItem === key) {
                      setState({ ...state, activeItem: '' });
                    } else if (isExpandable) {
                      setState({ ...state, activeItem: key });
                    }
                  }}
                >
                  {ordered ? `${index + 1}. ` : ''}
                  {value.title}
                </button>
                <div
                  className={cx(
                    'list-item-description',
                    listItemDescriptionClassname
                      ? listItemDescriptionClassname
                      : '',
                    isExpandable
                      ? state.activeItem === key
                        ? 'show'
                        : 'hide'
                      : '',
                  )}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(value.description),
                  }}
                />
              </div>
            </div>
          ))
        : ''}
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    content:
      state.prefetch?.[state.router.location.pathname] || state.content.data,
  })),
)(View);
