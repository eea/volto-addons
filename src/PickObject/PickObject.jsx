/*
 * A wrapper over ObjectBrowser because of API constraints
 */

import { TextWidget } from '@plone/volto/components'; //CheckboxWidget, Icon,
import { Link } from 'react-router-dom';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import React from 'react';

const ObjectBrowserWrapper = withObjectBrowser(
  ({ id, title, value, onSelectItem, openObjectBrowser }) => (
    <TextWidget
      id={id}
      title={value ? <Link to={value}>{title}</Link> : title}
      required={true}
      value={value}
      icon={value ? clearSVG : navTreeSVG}
      iconAction={
        value
          ? (id, value) => onSelectItem('')
          : () => openObjectBrowser({ mode: 'link', onSelectItem })
      }
      onChange={() => {}}
    />
  ),
);

const ObjectBrowserAdapter = props => {
  return (
    <ObjectBrowserWrapper
      onSelectItem={props.onChange}
      onChangeBlock={props.onChange}
      data={{ url: props.value }}
      {...props}
    />
  );
};

export default ObjectBrowserAdapter;
