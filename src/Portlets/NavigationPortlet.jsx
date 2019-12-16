import React from 'react';
import { List } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import { settings } from '~/config';

function Link({ href, ...props }) {
  const url =
    (href &&
      href
        .replace(settings.apiPath, '')
        .replace(settings.internalApiPath, '')) ||
    '';
  return <RouterLink to={url}>{props.children}</RouterLink>;
}

export default ({ portlet }) => {
  const items =
    (portlet && portlet.navigationportlet && portlet.navigationportlet.items) ||
    [];
  console.log('nav items', items);
  return (
    <List className="navigation-portlet">
      {items.map(item => (
        <List.Item key={item['@id']}>
          <List.Content>
            <List.Header>
              <Link href={item.href}>{item.title}</Link>
            </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
