// Code mostly from draft-js-buttons

import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { Dropdown } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import checkSVG from '@plone/volto/icons/check.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
// import { convertToRaw } from 'draft-js';

import './styles.css';

export default class StyleDropdown extends Component {
  inlineStyleIsActive = style =>
    this.props.getEditorState &&
    this.props
      .getEditorState()
      .getCurrentInlineStyle()
      .has(style);

  toggleInlineStyle = (event, style) => {
    const newState = RichUtils.toggleInlineStyle(
      this.props.getEditorState(),
      style,
    );
    this.props.setEditorState(newState);
    this.focusEditor(event);
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

  focusEditor = event => {
    // NOTE: the code here (and the use of onMouseDown as trigger) is needed to
    // prevent a bug in draftjs. See more here:
    // https://github.com/facebook/draft-js/pull/2022
    // https://github.com/facebook/draft-js/issues/2092
    // https://github.com/facebook/draft-js/pull/1176
    event.preventDefault();
    const getRef = this.props.store.getEditorRef;
    const editor = getRef && getRef();
    if (!editor) return;
    editor.focus();
  };

  checkIcon = <Icon name={checkSVG} size="15px" color="#b8c6c8" />;

  render() {
    const trigger = (
      <span className="toolbar-format">
        Formats <Icon name={downSVG} size="21px"/>
      </span>
    )
    return (
      <div>
        <Dropdown
          trigger={trigger}
          onMouseDown={this.focusEditor}
          closeOnBlur={false}
          icon={null}
          pointing='top left'
          >
          <Dropdown.Menu>
            <Dropdown.Item
              text="Bold"
              onClick={(ev, data) => {
                this.toggleInlineStyle(ev, 'BOLD');
              }}
              icon={this.inlineStyleIsActive('BOLD') ? this.checkIcon : null}
            />

            <Dropdown.Item
              text="Grey background block"
              onClick={(ev, data) => {
                this.toggleBlockType(ev, 'BLOCK-BG-GREY');
              }}
              icon={
                this.blockTypeIsActive('BLOCK-BG-GREY') ? this.checkIcon : null
              }
            />

            <Dropdown.Item
              text="Block-level element"
              onClick={(ev, data) => {
                this.toggleInlineStyle(ev, 'BLOCK-ELEMENT');
              }}
              icon={this.inlineStyleIsActive('BLOCK-ELEMENT') ? this.checkIcon : null}
            />

            <Dropdown.Item
              text="Centered inline-block element"
              onClick={(ev, data) => {
                this.toggleInlineStyle(ev, 'INLINE-CENTERED');
              }}
              icon={
                this.inlineStyleIsActive('INLINE-CENTERED') ? this.checkIcon : null
              }
            />

            <Dropdown.Item
              text="Large block of text"
              onClick={(ev, data) => {
                this.toggleInlineStyle(ev, 'LARGE-TEXT');
              }}
              icon={this.inlineStyleIsActive('LARGE-TEXT') ? this.checkIcon : null}
            />

            <Dropdown item simple text="Text color">
              <Dropdown.Menu>
                <Dropdown.Item
                  text="Green"
                  onClick={(ev, data) => {
                    this.toggleInlineStyle(ev, 'GREEN-COLOR');
                  }}
                  icon={
                    this.inlineStyleIsActive('GREEN-COLOR') ? this.checkIcon : null
                  }
                />
                <Dropdown.Item
                  text="Blue"
                  onClick={(ev, data) => {
                    this.toggleInlineStyle(ev, 'BLUE-COLOR');
                  }}
                  icon={
                    this.inlineStyleIsActive('BLUE-COLOR') ? this.checkIcon : null
                  }
                />
                <Dropdown.Item
                  text="Brown"
                  onClick={(ev, data) => {
                    this.toggleInlineStyle(ev, 'BROWN-COLOR');
                  }}
                  icon={
                    this.inlineStyleIsActive('BROWN-COLOR') ? this.checkIcon : null
                  }
                />
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown.Item
              text="Red inline"
              onClick={(ev, data) => {
                this.toggleInlineStyle(ev, 'BG-RED');
              }}
              icon={this.inlineStyleIsActive('BG-RED') ? this.checkIcon : null}
            />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
