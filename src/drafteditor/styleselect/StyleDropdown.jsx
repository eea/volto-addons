// Code mostly from draft-js-buttons

import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { Dropdown } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';

export default class StyleDropdown extends Component {
  // this.store.getEditorState

  inlineStyleIsActive = style =>
    this.props.getEditorState &&
    this.props
      .getEditorState()
      .getCurrentInlineStyle()
      .has(style);

  toggleInlineStyle = (event, style) => {
    event.preventDefault();
    this.props.setEditorState(
      RichUtils.toggleInlineStyle(this.props.getEditorState(), style),
    );
  };

  blockTypeIsActive = blockType => {
    // if the button is rendered before the editor
    if (!this.props.getEditorState) {
      return false;
    }

    const editorState = this.props.getEditorState();
    const type = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
    return type === blockType;
  };

  toggleBlockType = (event, blockType) => {
    event.preventDefault();
    this.props.setEditorState(
      RichUtils.toggleBlockType(this.props.getEditorState(), blockType),
    );
  };

  checkIcon = <Icon name={checkSVG} size="24px" color="#b8c6c8" />;

  render() {
    return (
      <Dropdown text="Format">
        <Dropdown.Menu>
          <Dropdown.Item
            text="Bold"
            onClick={(ev, data) => {
              this.toggleInlineStyle(ev, 'BOLD');
            }}
            icon={this.inlineStyleIsActive('BOLD') ? this.checkIcon : null}
          />

          <Dropdown.Item
            text="Red block"
            onClick={(ev, data) => {
              this.toggleBlockType(ev, 'BLOCK-BG-RED');
            }}
            icon={
              this.blockTypeIsActive('BLOCK-BG-RED') ? this.checkIcon : null
            }
          />

          <Dropdown.Item
            text="Red inline"
            onClick={(ev, data) => {
              this.toggleInlineStyle(ev, 'BG-RED');
            }}
            icon={this.inlineStyleIsActive('BG-RED') ? this.checkIcon : null}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
