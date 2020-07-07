import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isString } from 'lodash';
import { Table, Pagination } from 'semantic-ui-react';
import downSVG from '@plone/volto/icons/down-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';
import { Icon } from '@plone/volto/components';
import { getResources } from '../actions';

const components = {
  object_link_length: (schemaMetadata, itemMetadata, item) => {
    return (
      <a
        href={item[schemaMetadata.urlFieldId]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item[itemMetadata] && Object.keys(item[itemMetadata]).length}{' '}
        {schemaMetadata.title}
      </a>
    );
  },
  object_link_keys: (schemaMetadata, itemMetadata, item) => {
    return (
      <>
        {item[itemMetadata] &&
          Object.keys(item[itemMetadata])?.map(
            (key, index) =>
              index < 3 && <span key={`${index}_keyslist_${key}`}>{key}</span>,
          )}
        {item[itemMetadata] && Object.keys(item[itemMetadata]).length > 3 && (
          <a
            href={item[schemaMetadata.urlFieldId]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {Object.keys(item[itemMetadata]).length - 3} {schemaMetadata.title}
          </a>
        )}
      </>
    );
  },
  textarea_link_value: (schemaMetadata, itemMetadata, item) => {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: item[itemMetadata] }} />
        <a
          href={item[schemaMetadata.urlFieldId]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {schemaMetadata.title}
        </a>
      </>
    );
  },
  button_link_value: (schemaMetadata, itemMetadata, item) => {
    return (
      <div className="flex align-center flex-grow">
        <a href={item[itemMetadata]} className={schemaMetadata.className}>
          {schemaMetadata.title}
        </a>
      </div>
    );
  },
  default: (schemaMetadata, itemMetadata, item) => {
    if (Array.isArray(item[itemMetadata])) return item[itemMetadata].join(', ');
    if (typeof item[itemMetadata] === 'object' && item[itemMetadata] !== null)
      return Object.keys(item[itemMetadata]).join(', ');
    return item[itemMetadata];
  },
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const View = props => {
  const [state, setState] = useState({
    metadata: {},
    tableHeaders: 0,
    pagination: {
      activePage: 1,
      itemsPerPage: 5,
    },
    selectedItem: null,
  });
  const { activePage, itemsPerPage } = state.pagination;
  const totalItems = props.items_total;
  const items = props.items;
  const start = itemsPerPage * activePage - itemsPerPage;
  const prevMetadata = usePrevious(state.metadata);
  useEffect(() => {
    const metadata = props.data?.metadata
      ? isString(props.data.metadata.value)
        ? JSON.parse(props.data.metadata.value)
        : props.data.metadata.value
      : {};
    setState({
      ...state,
      metadata,
      tableHeaders: metadata?.fieldsets?.[0]?.fields?.length,
    });
    /* eslint-disable-next-line */
  }, [props.data?.metadata?.value])
  useEffect(() => {
    if (
      props.data?.path?.value &&
      prevMetadata &&
      prevMetadata.fieldsets?.[0]?.fields
        .concat()
        .sort()
        .join(',') !==
        state.metadata.fieldsets?.[0]?.fields
          .concat()
          .sort()
          .join(',')
    ) {
      props.dispatch(
        getResources(
          props.data.path.value,
          itemsPerPage,
          start,
          state.metadata.fieldsets?.[0]?.fields,
        ),
      );
    }
    /* eslint-disable-next-line */
  }, [state.metadata.fieldsets?.[0]?.fields])
  useEffect(() => {
    if (props.data?.path?.value) {
      props.dispatch(
        getResources(
          props.data.path.value,
          itemsPerPage,
          start,
          state.metadata.fieldsets?.[0]?.fields,
        ),
      );
    }
    /* eslint-disable-next-line */
  }, [state?.pagination?.activePage, state?.pagination?.itemsPerPage, props.data?.path?.value])
  return (
    <div className={`browse-table ${props.className}`}>
      <React.Fragment>
        <Table>
          {/* ==== TABLE HEADER ==== */}
          <Table.Header>
            <Table.Row>
              {state.metadata?.fieldsets?.[0]?.fields?.map(
                meta =>
                  state.metadata.properties[meta].tableType ===
                    'Table header' && (
                    <Table.HeaderCell key={`header-${meta}`}>
                      {state.metadata.properties[meta].title}
                    </Table.HeaderCell>
                  ),
              )}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          {/* ==== TABLE BODY ==== */}
          <Table.Body>
            {items?.map((item, trIndex) => (
              <React.Fragment key={item['@id']}>
                {/* ==== TABLE ROW ====*/}
                <Table.Row key={`tr-${trIndex}`}>
                  {state.metadata?.fieldsets?.[0]?.fields?.map(
                    (meta, cellIndex) => {
                      if (
                        state.metadata.properties[meta].tableType ===
                        'Table header'
                      ) {
                        const dataType =
                          state.metadata.properties[meta].dataType;
                        const show = state.metadata.properties[meta].show;

                        return (
                          <Table.Cell
                            key={`cell-${trIndex}-${cellIndex}-${meta}`}
                          >
                            {components[`${dataType}_${show}`]
                              ? components[`${dataType}_${show}`](
                                  state.metadata.properties[meta],
                                  meta,
                                  item,
                                )
                              : components.default(
                                  state.metadata.properties[meta],
                                  meta,
                                  item,
                                )}
                          </Table.Cell>
                        );
                      }
                      return null;
                    },
                  )}
                  <Table.Cell>
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (state.selectedItem?.['@id'] === item['@id']) {
                          setState({ ...state, selectedItem: null });
                          return;
                        }
                        setState({ ...state, selectedItem: item });
                      }}
                    >
                      <Icon
                        name={
                          state.selectedItem?.['@id'] === item['@id']
                            ? downSVG
                            : rightSVG
                        }
                        size="3em"
                      />
                    </button>
                  </Table.Cell>
                </Table.Row>
                {/* ==== TABLE HIDDEN ROW ==== */}
                <Table.Row
                  className={
                    state.selectedItem?.['@id'] === item['@id']
                      ? 'hidden-row show'
                      : 'hidden-row hide'
                  }
                >
                  <Table.Cell colSpan={state.tableHeaders + 1}>
                    <div className="table-flex-container">
                      {props.data?.hiddenRowTypes?.value?.map(type => (
                        <div key={`hr-${trIndex}-${type}`}>
                          {type !== 'Action' && (
                            <span className="header">{type}</span>
                          )}
                          <div
                            className="flex column"
                            style={{
                              height: type !== 'Action' ? 'auto' : '100%',
                            }}
                          >
                            {state.metadata?.fieldsets?.[0]?.fields?.map(
                              meta => {
                                if (
                                  state.metadata.properties[meta].tableType ===
                                    'Hidden row' &&
                                  state.metadata.properties[meta]
                                    .hiddenRowType === type
                                ) {
                                  const dataType =
                                    state.metadata.properties[meta].dataType;
                                  const show =
                                    state.metadata.properties[meta].show;

                                  return (
                                    <React.Fragment key={`hidden_row_${meta}`}>
                                      {components[`${dataType}_${show}`]
                                        ? components[`${dataType}_${show}`](
                                            state.metadata.properties[meta],
                                            meta,
                                            item,
                                          )
                                        : components.default(
                                            state.metadata.properties[meta],
                                            meta,
                                            item,
                                          )}
                                    </React.Fragment>
                                  );
                                }
                                return null;
                              },
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))}
          </Table.Body>
          {/* ==== TABLE FOOTER ==== */}
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7" style={{ textAlign: 'center' }}>
                <Pagination
                  activePage={activePage}
                  onPageChange={(event, pagination) => {
                    setState({
                      ...state,
                      pagination: {
                        ...state.pagination,
                        activePage: pagination.activePage,
                      },
                      selectedItem: null,
                    });
                  }}
                  totalPages={Math.ceil(totalItems / itemsPerPage)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </React.Fragment>
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    items: state.resources.data['industrial-sites']?.items || [],
    items_total: state.resources.data['industrial-sites']?.items_total || 0,
  })),
)(View);
