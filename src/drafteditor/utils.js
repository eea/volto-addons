import { EditorState, Modifier } from 'draft-js';
import EditorUtils from 'draft-js-plugins-utils';

export function removeEntityOfSelection(editorState) {
  const entityKey = EditorUtils.getCurrentEntityKey(editorState);
  const entity = EditorUtils.getCurrentEntity(editorState);

  console.log('entityKey', entityKey);
  console.log('entity', entity);

  // const contentState = editorState.getCurrentContent();
  // const selectionState = editorState.getSelection();
  //
  // const startKey = selectionState.getStartKey();
  // const anchorKey = selectionState.getAnchorKey();
  //
  // const contentBlock = contentState.getBlockForKey(anchorKey);
  //
  // const startOffset = selectionState.getStartOffset();
  // const entity = contentBlock.getEntityAt(startOffset);
  //
  // console.log('selection state', selectionState);
  // console.log('startKey', startKey);
  // console.log('anchorKey', anchorKey);
  // console.log('contentBlock', contentBlock);
  // // console.log('entity', entity);

  return editorState;

  if (!entity) {
    return editorState;
  }

  let entitySelection = null;

  contentBlock.findEntityRanges(
    character => character.getEntity() === entity,
    (start, end) => {
      entitySelection = selectionState.merge({
        anchorOffset: start,
        focusOffset: end,
      });
    },
  );

  const newContentState = Modifier.applyEntity(
    contentState,
    entitySelection,
    null,
  );

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity',
  );

  return newEditorState;
}
