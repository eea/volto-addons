/* REACT */
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import DOMPurify from 'dompurify';
import './style.css';

const View = ({ content, ...props }) => {
  const [state, setState] = useState({
    activeItem: '',
  });
  const isExpandable = props.data?.isExpandable?.value;
  const ordered = props.data?.ordered?.value;
  const listItemClassname = props.data?.listItemClassname?.value;
  const listClassname = props.data?.listClassname?.value;
  const items = props.data?.items?.value
    ? JSON.parse(props.data.items.value).properties
    : {};

  return (
    <List
      as={ordered ? 'ol' : 'ul'}
      className={
        listClassname ? `expendableList ${listClassname}` : 'expendableList'
      }
    >
      {items
        ? Object.entries(items).map(([key, value]) => {
            return (
              <List.Item
                as="li"
                key={key}
                className={
                  (listItemClassname ? listItemClassname : '') +
                  (isExpandable ? 'expandable' : 'no-expandable')
                }
                onClick={() => {
                  if (isExpandable && state.activeItem === key) {
                    setState({ ...state, activeItem: '' });
                  } else if (isExpandable) {
                    setState({ ...state, activeItem: key });
                  }
                }}
              >
                <span
                  className={
                    'title ' +
                    (isExpandable
                      ? state.activeItem === key
                        ? 'active'
                        : ''
                      : 'active')
                  }
                >
                  {value.title}
                </span>
                {/* eslint-disable-next-line */}
                <div
                  className={
                    'description ' +
                    (isExpandable
                      ? state.activeItem === key
                        ? 'show'
                        : 'hide'
                      : '')
                  }
                  onClick={e => e.stopPropagation()}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(value.description),
                  }}
                />
              </List.Item>
            );
          })
        : ''}
    </List>
  );
};

export default compose(
  connect((state, props) => ({
    content:
      state.prefetch?.[state.router.location.pathname] || state.content.data,
  })),
)(View);
