import React, { Component } from 'react';
import { SidebarPortal } from '@plone/volto/components';

export default class EditForm extends Component {
  render() {
    return (
      <SidebarPortal selected={true}>
        <div>Hello</div>;
      </SidebarPortal>
    );
  }
}
