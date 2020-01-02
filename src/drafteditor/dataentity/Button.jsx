import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import linkSVG from '@plone/volto/icons/add-on.svg';
import unlinkSVG from '@plone/volto/icons/add-user.svg';
import { addDataEntity } from './modifiers';
import cx from 'classnames';

import EditorUtils from 'draft-js-plugins-utils';
import { removeEntityOfSelection } from 'volto-addons/drafteditor/utils';
import { EditorState } from 'draft-js';

import EditForm from './EditForm';
import * as types from './types';

// import { convertToRaw } from 'draft-js';

class DataButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    store: PropTypes.shape({}).isRequired,
    onOverrideContent: PropTypes.func.isRequired,
  };

  // constructor(props) {
  //   super(props);
  //
  //   // TODO: State is only temporarily used, needs to be refactored as
  //   // controlled input
  //   // this.state = {
  //   //   url: '',
  //   // };
  // }

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

  onChangeBlock() {
    console.log('on change block', arguments);
  }

  onChangeEntityData = (entityKey, { url }) => {
    console.log(entityKey, url);
    this.setState({ url });

    const data = { url };

    const { getEditorState, setEditorState } = this.props.store;
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const newContentState = contentState.mergeEntityData(entityKey, data);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'change-dataentity',
    );
    setEditorState(newEditorState);
  };

  render() {
    const { theme, getEditorState } = this.props;

    const isSelected = EditorUtils.hasEntity(
      getEditorState(),
      types.DATAENTITY,
    );

    const editorState = getEditorState();
    const currentEntityKey = EditorUtils.getCurrentEntityKey(editorState);
    const currentEntity = EditorUtils.getCurrentEntity(editorState);

    console.log('current entity', currentEntityKey, currentEntity);
    // entity has type, mutability, data

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

        {isSelected ? (
          <EditForm
            onChangeBlock={this.onChangeBlock}
            onChangeEntityData={this.onChangeEntityData}
            block="data-entity"
            entityKey={currentEntityKey}
            data={currentEntity.data}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default DataButton;
