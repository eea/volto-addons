import { Button, Form, Grid, Input } from 'semantic-ui-react';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import { Icon } from '@plone/volto/components'; // EditBlock
import React from 'react';

const ObjectBrowserPicker = ({ id, url, ...props }) => {
  // TODO: should implement input
  console.log('object browser picker', id, url, props);
  return (
    <>
      <Button.Group>
        <Button
          basic
          icon
          inline
          onClick={e => {
            e.stopPropagation();
            props.openObjectBrowser({
              mode: 'link',
              onSelectItem: url => props.onChange(id, url),
            });
          }}
        >
          <Icon name={navTreeSVG} size="24px" />
        </Button>
      </Button.Group>
      <Input
        id={`field-${id}`}
        name={id}
        value={url || ''}
        disabled={false}
        onChange={({ target }) => {}}
      />
    </>
  );
};

const PickObjectWithObjectBrowser = withObjectBrowser(ObjectBrowserPicker);

const PickObjectWrapper = ({ value, ...rest }) => {
  return <PickObjectWithObjectBrowser {...rest} data={{ url: value }} />;
};

export default PickObjectWrapper;
