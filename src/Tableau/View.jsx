import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import qs from 'query-string';
import { settings } from '~/config';
import Tableau from './Tableau';

const TableauBlockView = props => {
  const { query } = props;
  const { search } = props.discodata_query;
  const data = props.data || {};
  const [state, setState] = useState({
    url: data.url?.value || '',
    tableauVersion: data.tableauVersion?.value || settings.tableauVersion || '',
    sheetname: data.sheetname?.value || '',
    filters: data.filters?.value || undefined,
    hideTabs: data.hideTabs?.value || '',
    hideToolbars: data.hideToolbars?.value || '',
    hideShare: data.hideShare?.value || false,
  });
  const globalQuery = { ...query, ...search };
  const options = {
    ...state.filters,
    hideTabs: state.hideTabs,
    hideToolbars: state.hideToolbars,
  };
  const queryParameters = props.data?.queryParameters?.value
    ? JSON.parse(props.data.queryParameters.value).properties
    : {};
  const queryParametersToSet = {};
  queryParameters &&
    Object.entries(queryParameters).forEach(([key, value]) => {
      queryParametersToSet[key] = globalQuery[value.queryParam] || '';
    });
  if (__SERVER__) return '';
  return (
    <div
      className="chartWrapperView"
      style={{
        width: '100%',
        overflowX: 'auto',
      }}
    >
      {state.url ? (
        <Tableau
          url={state.url}
          tableauVersion={state.tableauVersion || settings.tableauVersion}
          filters={state.filters}
          sheetname={state.sheetname}
          options={options}
          hideShare={state.hideShare}
          queryParameters={queryParametersToSet}
        />
      ) : (
        <div>Invalid or missing data.</div>
      )}
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    query: state.router.location.search,
    discodata_query: state.discodata_query,
  })),
)(TableauBlockView);
