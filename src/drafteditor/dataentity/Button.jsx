import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditorUtils from 'draft-js-plugins-utils';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import linkSVG from '@plone/volto/icons/add-on.svg';
import unlinkSVG from '@plone/volto/icons/add-user.svg';
import { addDataEntity } from './modifiers';
import cx from 'classnames';
import { removeEntityOfSelection } from 'volto-addons/drafteditor/utils';

import EditForm from './EditForm';

// import { convertToRaw } from 'draft-js';

class DataButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    store: PropTypes.shape({}).isRequired,
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
    const newState = addDataEntity(editorState, {});

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
    const isSelected = EditorUtils.hasEntity(getEditorState(), 'DATAENTITY');
    const className = cx(theme.button, { [theme.active]: isSelected });

    return (
      <div
        className={theme.buttonWrapper}
        onMouseDown={this.onMouseDown}
        role="presentation"
      >
        <button
          className={className}
          onClick={
            isSelected ? this.onRemoveBlockAtSelection : this.onButtonClick
          }
          type="button"
        >
          {!isSelected ? (
            <Icon name={linkSVG} size="24px" />
          ) : (
            <Icon name={unlinkSVG} size="24px" />
          )}
        </button>

        {isSelected ? <EditForm /> : ''}
      </div>
    );
  }
}

export default DataButton;
