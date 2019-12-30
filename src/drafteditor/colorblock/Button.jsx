import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorUtils from 'draft-js-plugins-utils';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import linkSVG from '@plone/volto/icons/link.svg';
import unlinkSVG from '@plone/volto/icons/unlink.svg';
import { addColorBlock } from './modifiers';
import cx from 'classnames';
import { removeEntityOfSelection } from 'volto-addons/drafteditor/utils';

// import { convertToRaw } from 'draft-js';

class ColorBlockButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    store: PropTypes.shape({}).isRequired,
    // theme: PropTypes.shape({}).isRequired,
    // ownTheme: PropTypes.shape({}).isRequired,
    // onRemoveColorBlockAtSelection: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  onButtonClick = e => {
    e.preventDefault();
    e.stopPropagation();

    const { getEditorState, setEditorState } = this.props.store;
    const editorState = getEditorState();
    const newState = addColorBlock(editorState, { width: '100px' });

    // const newContent = newState.getCurrentContent();
    // console.log('constructed new state', newState, newContent);
    // console.log('new content raw', convertToRaw(newContent));

    setEditorState(newState);
  };

  onRemoveBlockAtSelection = e => {
    console.log('remove block');

    e.preventDefault();
    e.stopPropagation();

    const { getEditorState, setEditorState } = this.props.store;
    setEditorState(removeEntityOfSelection(getEditorState()));
  };

  render() {
    const { theme, getEditorState } = this.props;

    // TODO: this needs to be adjusted
    const hasBlockSelected = EditorUtils.hasEntity(
      getEditorState(),
      'COLORBLOCK',
    );
    const className = cx(theme.button, { [theme.active]: hasBlockSelected });

    return (
      <div
        className={theme.buttonWrapper}
        onMouseDown={this.onMouseDown}
        role="presentation"
      >
        <button
          className={className}
          onClick={
            hasBlockSelected
              ? this.onRemoveBlockAtSelection
              : this.onButtonClick
          }
          type="button"
        >
          {!hasBlockSelected ? (
            <Icon name={linkSVG} size="24px" />
          ) : (
            <Icon name={unlinkSVG} size="24px" />
          )}
        </button>
      </div>
    );
  }
}

export default ColorBlockButton;
