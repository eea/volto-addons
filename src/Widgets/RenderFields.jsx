import React from 'react';

import { Segment } from 'semantic-ui-react';

import {
  SidebarPortal,
  SchemaWidget,
  TextWidget,
  CheckboxWidget,
  ArrayWidget,
} from '@plone/volto/components';

const RenderFields = props => {
  const { schema, title } = props;
  return (
    <SidebarPortal selected={props.selected}>
      <Segment.Group raised>
        <header className="header pulled">
          <h2>{title}</h2>
        </header>
        {Object.keys(schema).map(key => (
          <React.Fragment key={key}>
            {schema[key].type === 'array' ? (
              <Segment className="form">
                <ArrayWidget
                  id={`array-widget-column-${key}`}
                  title={schema[key].title}
                  required={false}
                  onChange={(id, value) => {
                    props.onChangeBlock(props.block, {
                      ...props.data,
                      [key]: {
                        ...props.data.key,
                        value,
                      },
                    });
                  }}
                  value={props.data?.[key]?.value}
                />
              </Segment>
            ) : (
              ''
            )}
            {(schema[key].type === 'text' && !schema[key].requires) ||
            (schema[key].requires &&
              props.data?.[schema[key].requires]?.value) ? (
              <Segment className="form">
                <TextWidget
                  id={`text-widget-column-${key}`}
                  title={schema[key].title}
                  required={false}
                  onChange={(id, value) => {
                    props.onChangeBlock(props.block, {
                      ...props.data,
                      [key]: {
                        ...props.data.key,
                        value,
                      },
                    });
                  }}
                  value={props.data?.[key]?.value || schema[key].default}
                />
              </Segment>
            ) : (
              ''
            )}
            {schema[key].type === 'checkbox' ? (
              <Segment className="form">
                <CheckboxWidget
                  id={`checkbox-widget-column-${key}`}
                  title={schema[key].title}
                  required={false}
                  onChange={(id, value) => {
                    props.onChangeBlock(props.block, {
                      ...props.data,
                      [key]: {
                        ...props.data.key,
                        value,
                      },
                    });
                  }}
                  value={props.data?.[key]?.value}
                />
              </Segment>
            ) : (
              ''
            )}
            {schema[key].type === 'schema' ? (
              <Segment className="form">
                <SchemaWidget
                  {...props}
                  id={`checkbox-widget-column-${key}`}
                  title={schema[key].title}
                  schema={schema[key].fieldSetSchema}
                  required={false}
                  onChange={(id, value) => {
                    props.onChangeBlock(props.block, {
                      ...props.data,
                      [key]: {
                        ...props.data.key,
                        value,
                      },
                    });
                  }}
                  editFieldset={schema[key].editFieldset}
                  deleteFieldset={schema[key].deleteFieldset}
                  value={
                    props.data?.[key]?.value ||
                    `{"fieldsets":[{"id":"${schema[key].fieldSetId}","title":"${
                      schema[key].title
                    }","fields":[]}],"properties":{}}`
                  }
                />
              </Segment>
            ) : (
              ''
            )}
          </React.Fragment>
        ))}
      </Segment.Group>
    </SidebarPortal>
  );
};

export default RenderFields;
