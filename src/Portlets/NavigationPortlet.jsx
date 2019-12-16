import React from 'react';
import { List } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import { settings } from '~/config';

import './styles.css';

function Link({ href, ...props }) {
  const url =
    (href &&
      href
        .replace(settings.apiPath, '')
        .replace(settings.internalApiPath, '')) ||
    '';
  return (
    <RouterLink to={url} title={props.title}>
      {props.children}
    </RouterLink>
  );
}

function renderNode(node) {
  // console.log('render node', node);
  return (
    <List.Item key={node['@id']} active={node.is_current}>
      {node.is_current ? <List.Content floated="right">&gt;</List.Content> : ''}
      <List.Content>
        <List.Header>
          <Link href={node.href} title={node.description}>
            {node.title}
          </Link>
        </List.Header>
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
  console.log('nav items', items);
  return <List className="navigation-portlet">{items.map(renderNode)}</List>;
};
