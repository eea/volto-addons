import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classnames';
import { cleanUrl } from './helpers';

import './styles.css';

function renderNode(node) {
  return (
    <List.Item key={node['@id']} active={node.is_current}>
      {node.is_current ? <List.Content floated="right">&lt;</List.Content> : ''}
      <List.Content>
        <RouterLink
          to={cleanUrl(node.href)}
          title={node.description}
          className={cx(`contenttype-${node.type}`, {
            in_path: node.is_in_path,
          })}
        >
          {node.thumb ? <Image src={cleanUrl(node.thumb)} /> : ''}
          {node.title}
        </RouterLink>
        {(node.items.length && (
          <List.List>{node.items.map(renderNode)}</List.List>
        )) ||
          ''}
      </List.Content>
    </List.Item>
  );
}

export default ({ portlet }) => {
  const items =
    (portlet && portlet.navigationportlet && portlet.navigationportlet.items) ||
    [];
  return items.length ? (
    <div className="navigation-portlet">
      {portlet.navigationportlet?.has_custom_name ? (
        <div className="nav-portlet-header">
          <RouterLink to={cleanUrl(portlet.navigationportlet?.url || '')}>
            {portlet.navigationportlet.title}
          </RouterLink>
        </div>
      ) : (
        ''
      )}
      <List>{items.map(renderNode)}</List>
    </div>
  ) : (
    ''
  );
};
