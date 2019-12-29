import { EditorState, Modifier } from 'draft-js';

export function removeEntityOfSelection(editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const startKey = selectionState.getStartKey();
  const contentBlock = contentState.getBlockForKey(startKey);
  const startOffset = selectionState.getStartOffset();
  const entity = contentBlock.getEntityAt(startOffset);

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
