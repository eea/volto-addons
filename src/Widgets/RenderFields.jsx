import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import {
  SidebarPortal,
  SchemaWidget,
  TextWidget,
  CheckboxWidget,
  ArrayWidget,
} from '@plone/volto/components';
import { addAppURL } from '@plone/volto/helpers';

import { getDataFromProvider } from 'volto-datablocks/actions';

const makeChoices = keys => keys.map(k => [k, k]);

const RenderFields = props => {
  const { schema, title } = props;
  return (
    <SidebarPortal selected={props.selected}>
      <Segment.Group>
        <header className="header pulled">
          <h2>{title}</h2>
        </header>
        {Object.keys(schema).map(key => (
          <React.Fragment key={key}>
            {/* ARRAY TYPE */}
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
            {/* TEXT TYPE */}
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
            {/* CHECKBOX TYPE */}
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
            {/* SCHEMA TYPE */}
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
            {/* SQL TYPE */}
            {schema[key].type === 'sql' ? (
              <Segment className="form sidebar-image-data">
                <div>
                  <p
                    style={{
                      padding: '1rem 1rem 0 1rem',
                      margin: '0',
                      fontSize: '16px',
                    }}
                  >
                    {schema[key].title}
                  </p>
                  <p
                    style={{
                      padding: '0.5rem 1rem',
                      margin: '0',
                      fontSize: '12px',
                    }}
                    className="info"
                  >
                    SELECT * FROM "{props.data?.[key]?.selectQuery?.table}"
                    WHERE "{props.data?.[key]?.selectQuery?.columnKey}" = "
                    {props.data?.[key]?.selectQuery?.columnValue}"
                    {props.data?.[key]?.additionalQuery && (
                      <span>
                        {' '}
                        AND "{props.data?.[key]?.additionalQuery?.columnKey}" =
                        "{props.data?.[key]?.additionalQuery?.columnValue}"
                      </span>
                    )}
                  </p>
                  {schema[key].selectQueryFields?.map((field, index) => (
                    <TextWidget
                      id={`additional-query-widget-column-${index}`}
                      key={`additional-query-widget-column-${index}`}
                      title={field.title}
                      required={false}
                      onChange={(id, value) => {
                        props.onChangeBlock(props.block, {
                          ...props.data,
                          [key]: {
                            ...props.data?.[key],
                            selectQuery: {
                              ...props.data?.[key]?.selectQuery,
                              [field.id]: value,
                            },
                          },
                        });
                      }}
                      value={props.data?.[key]?.selectQuery?.[field.id]}
                    />
                  ))}
                  {schema[key].additionalQueryFields && (
                    <p
                      style={{
                        padding: '1rem 1rem 0 1rem',
                        fontSize: '16px',
                      }}
                    >
                      Additional query
                    </p>
                  )}
                  {schema[key].additionalQueryFields?.map((field, index) => (
                    <TextWidget
                      id={`select-query-widget-column-${index}`}
                      key={`select-query-widget-column-${index}`}
                      title={field.title}
                      required={false}
                      onChange={(id, value) => {
                        props.onChangeBlock(props.block, {
                          ...props.data,
                          [key]: {
                            ...props.data?.[key],
                            additionalQuery: {
                              ...props.data?.[key]?.additionalQuery,
                              [field.id]: value,
                            },
                          },
                        });
                      }}
                      value={props.data?.[key]?.additionalQuery?.[field.id]}
                    />
                  ))}
                </div>
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

function getProviderData(state, props) {
  let providers = null;
  if (props?.data?.providers)
    providers = { ...JSON.parse(JSON.stringify(props.data.providers)) };
  if (props?.data?.provider_url && !providers)
    providers = {
      default: {
        path: props?.data?.provider_url,
      },
    };
  if (!providers) return;
  Object.keys(providers).forEach(provider => {
    const path = `${providers[provider].path}/@connector-data`;
    const url = `${addAppURL(path)}/@connector-data`;
    const data = state.data_providers.data || {};
    providers[provider].data = path ? data[path] || data[url] : [];
    providers[provider].choices = makeChoices(
      Object.keys(providers[provider].data || {}),
    );
  });
  return providers;
}

export default connect(
  (state, props) => ({
    providers: props.withProvider ? getProviderData(state, props) : null,
  }),
  {
    getDataFromProvider,
  },
)(RenderFields);