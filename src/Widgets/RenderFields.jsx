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
            {/* DATA QUERY TYPE */}
            {schema[key].type === 'data-query' ? (
              <Segment className="form sidebar-image-data">
                <div>
                  <p style={{ padding: '1rem', margin: '0', fontSize: '16px' }}>
                    Additional query
                  </p>
                  <TextWidget
                    id={`data-query-widget-column-${key}_i`}
                    title={schema[key].iTitle}
                    required={false}
                    onChange={(id, value) =>
                      props.onChangeBlock(props.block, {
                        ...props.data,
                        [key]: {
                          ...props.data?.[key],
                          value: {
                            ...props.data?.[key]?.value,
                            i: value || '',
                            o: 'plone.app.querystring.operation.selection.any',
                          },
                        },
                      })
                    }
                    value={props.data?.[key]?.value?.i}
                  />
                  <ArrayWidget
                    id={`data-query-widget-column-${key}_v`}
                    title={schema[key].vTitle}
                    required={false}
                    onChange={(id, value) =>
                      props.onChangeBlock(props.block, {
                        ...props.data,
                        [key]: {
                          ...props.data?.[key],
                          value: {
                            ...props.data?.[key]?.value,
                            v: value || [],
                            o: 'plone.app.querystring.operation.selection.any',
                          },
                        },
                      })
                    }
                    value={props.data?.[key]?.value?.v}
                  />
                </div>
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
                    SQL Select
                  </p>
                  <p
                    style={{
                      padding: '0.5rem 1rem',
                      margin: '0',
                      fontSize: '12px',
                    }}
                    className="info"
                  >
                    SELECT * FROM "{props.data?.[key]?.value?.table}" WHERE "
                    {props.data?.[key]?.value?.columnKey}" = "
                    {props.data?.[key]?.value?.columnValue}"
                  </p>
                  <TextWidget
                    id={`sql-widget-column-${key}-1`}
                    title="Table"
                    required={false}
                    onChange={(id, value) => {
                      props.onChangeBlock(props.block, {
                        ...props.data,
                        [key]: {
                          ...props.data?.[key],
                          value: {
                            ...props.data?.[key]?.value,
                            table: value,
                          },
                        },
                      });
                    }}
                    value={props.data?.[key]?.value?.table}
                  />
                  <TextWidget
                    id={`sql-widget-column-${key}-2`}
                    title="Where column"
                    required={false}
                    onChange={(id, value) => {
                      props.onChangeBlock(props.block, {
                        ...props.data,
                        [key]: {
                          ...props.data?.[key],
                          value: {
                            ...props.data?.[key]?.value,
                            columnKey: value,
                          },
                        },
                      });
                    }}
                    value={props.data?.[key]?.value?.columnKey}
                  />
                  <TextWidget
                    id={`sql-widget-column-${key}-3`}
                    title="Is equal to"
                    required={false}
                    onChange={(id, value) => {
                      props.onChangeBlock(props.block, {
                        ...props.data,
                        [key]: {
                          ...props.data?.[key],
                          value: {
                            ...props.data?.[key]?.value,
                            columnValue: value,
                          },
                        },
                      });
                    }}
                    value={props.data?.[key]?.value?.columnValue}
                  />
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
