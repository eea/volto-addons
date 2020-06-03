import React, { useState } from 'react';
import { BodyClass } from '@plone/volto/helpers';
import { Button, Modal } from 'semantic-ui-react';
import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';
import { Icon as VoltoIcon, Field } from '@plone/volto/components';

const BlocksLayoutEditor = props => {
  const [blockData, setBlockData] = useState(props.value || {});
  const { onSave, onClose } = props;
  const isValid = value => {
    try {
      JSON.parse(value);
      console.log('is valid', value);
      return true;
    } catch {
      console.log('is not valid', value);
      return false;
    }
  };

  return (
    <Modal className="mosaic-modal" open={true} size="fullscreen">
      <BodyClass className="mosaic-page-modal-open" />
      <Modal.Content scrolling>
        <Field
          widget="textarea"
          id="blocksdata-importexport"
          title="Blocks data"
          description={`Use this field to either copy this layout to another
          page or replace the layout from another page`}
          onChange={(id, value) =>
            setBlockData((isValid(value) && JSON.parse(value)) || blockData)
          }
          value={JSON.stringify(blockData, 2)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button.Group floated="right">
          <Button basic circular primary onClick={() => onSave(blockData)}>
            <VoltoIcon name={penIcon} className="circled" />
          </Button>
          <Button basic circular secondary size="big" onClick={onClose}>
            <VoltoIcon name={clearIcon} className="circled" />
          </Button>
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
};

export default BlocksLayoutEditor;
