import React, { useState, useEffect, useCallback } from 'react';
import BlocksLayoutEditor from './BlocksLayoutEditor';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { Icon as VoltoIcon, Field, Toast } from '@plone/volto/components';
import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';
import { connect } from 'react-redux';
import { cloneAsType } from '../actions';
import { getBaseUrl } from '@plone/volto/helpers';
import Spinner from 'volto-addons/Spinner';
import { toast } from 'react-toastify';

const description = `Saving this as a clonable template will create a new content
type with the provided name.`;

const CreateTemplateDialog = ({ onSave, onClose }) => {
  const [typeName, setTypeName] = useState(null);

  return (
    <Modal className="dialog-modal" open={true}>
      <BodyClass className="mosaic-page-modal-open" />
      <Modal.Content scrolling>
        <Field
          type="text"
          id="contenttype-title"
          title="Name of template"
          description={description}
          onChange={(id, value) => setTypeName(value)}
          value={typeName}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button.Group floated="right">
          <Button basic circular primary onClick={() => onSave(typeName)}>
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

const Toolbar = ({ formData, onSave, cloneAsType, ...props }) => {
  const [showImportExport, setShowImportExport] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [infoShown, setInfoShown] = useState(true);

  const showSuccess = useCallback(() => {
    if (props.cloned_type.loaded && !infoShown) {
      setInfoShown(true)
      toast.info(
        <Toast
          info
          title="Template type created"
          content={`A new template type has been created: ${
            props.cloned_type.items?.name
          }`}
        />,
      );
      setShowCreateTemplate(false);
    }
  }, [
    props.cloned_type.items,
    props.cloned_type.loaded,
    setShowCreateTemplate,
    infoShown,
  ]);
  const showFailure = useCallback(() => {
    if (props.cloned_type.error && !infoShown) {
      setInfoShown(true)
      toast.error(
        <Toast
          error
          title="Template type has not been created"
          content="An error occured while creating the new template type."
        />,
      );
    }
  }, [props.cloned_type.error, infoShown,]);
  const preventPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {
    showSuccess();
    showFailure();
  }, [showSuccess, showFailure]);

  return (
    <Segment.Group className="layout-templating" style={{
      width: "100%",
      boxShadow: "none"
    }}>
      <Segment>
        <div className="import-export-blockdata">
          {props.cloned_type.loading && <Spinner />}

          <Button size="mini" onClick={(event) =>  {
            preventPropagation(event)
            setShowImportExport(true)
          }}>
            Import/Export layout and blocks
          </Button>

          {props.location && props.mode === 'editform' && (
            <Button size="mini" onClick={() =>  {
              preventPropagation(event)
              setShowCreateTemplate(true)
            }}>
              Save as clonable template
            </Button>
          )}

          {showImportExport && (
            <BlocksLayoutEditor
              value={{
                blocks: formData?.blocks || {},
                blocks_layout: formData?.blocks_layout || {},
              }}
              onSave={formData => {
                preventPropagation(event)
                setInfoShown(false)
                onSave(formData);
                setShowImportExport(false);
              }}
              onClose={() => {
                preventPropagation(event)
                setInfoShown(true)
                setShowImportExport(false)
              }}
            />
          )}

          {showCreateTemplate && (
            <CreateTemplateDialog
              onSave={typeName => {
                preventPropagation(event)
                setInfoShown(false)
                cloneAsType(props.location, typeName);
              }}
              onClose={() => {
                preventPropagation(event)
                setInfoShown(true)
                setShowCreateTemplate(false)
              }}
            />
          )}
        </div>
      </Segment>
    </Segment.Group>
  );
};

export default connect(
  (state, props) => {
    return {
      location: getBaseUrl(state.router.location?.pathname || ''),
      cloned_type: state.cloned_type,
    };
  },
  { cloneAsType },
)(Toolbar, { forwardRef: true });
