import React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import shallowequal from 'shallowequal';
import tokenizeUrl from './tokenizeUrl';
import qs from 'query-string';
import { parse } from 'path';

const propTypes = {
  tableauVersion: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  options: PropTypes.object,
  token: PropTypes.string,
  onLoad: PropTypes.func,
  query: PropTypes.string,
};

const defaultProps = {
  loading: false,
  parameters: {},
  filters: {},
  options: {},
};

class Tableau extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (!__SERVER__ && this.props.tableauVersion) {
      this.api = require(`./tableau-${this.props.tableauVersion}`);
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.api) {
      this.initTableau(this.props.url);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isReportChanged = prevProps.url !== this.props.url;
    const isLoading = this.state.loading;
    const isShareChanged = prevProps.hideShare !== this.props.hideShare;
    const isTabsChanged =
      prevProps.options.hideTabs !== this.props.options.hideTabs;
    const isToolbarsChanged =
      prevProps.options.hideToolbars !== this.props.options.hideToolbars;
    const isParametersChanged =
      !shallowequal(prevProps, this.props.parameters) ||
      !shallowequal(prevProps.queryParameters, this.props.queryParameters);
    console.log('HERE', this.props.url);
    if (
      isTabsChanged ||
      isReportChanged ||
      isToolbarsChanged ||
      isShareChanged
    ) {
      this.initTableau(this.props.url);
    }
    // Only parameters are changed, apply via the API
    if (!isReportChanged && isParametersChanged && !isLoading) {
      this.applyParameters(this.props.parameters);
    }
    // token change, validate it.
    if (prevProps.token !== this.props.token) {
      this.setState({ didInvalidateToken: false });
    }
    //  Select tableau version and update tableau
    if (
      prevProps.tableauVersion !== this.props.tableauVersion &&
      this.props.tableauVersion
    ) {
      this.api = require(`./tableau-${this.props.tableauVersion}`);
      this.initTableau(this.props.url);
    }
  }

  onChange(saveData) {
    this.props.callback && this.props.callback(saveData);
  }

  /**
   * Compares the values of filters to see if they are the same.
   * @param  {Array<Number>} a
   * @param  {Array<Number>} b
   * @return {Boolean}
   */
  compareArrays(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.sort().toString() === b.sort().toString();
    }

    return undefined;
  }

  /**
   * Execute a callback when an array of promises complete, regardless of
   * whether any throw an error.
   */
  onComplete(promises, cb) {
    Promise.all(promises).then(() => cb(), () => cb());
  }

  /**
   * Returns a vizUrl, tokenizing it if a token is passed and immediately
   * invalidating it to prevent it from being used more than once.
   */
  getUrl(nextUrl) {
    const newUrl = nextUrl || this.props.url;
    const token = this.props.token;
    const parsed =
      newUrl && typeof newUrl === 'string' && url.parse(newUrl, true);
    if (!parsed.protocol || !parsed.host) return '';
    if (!this.state.didInvalidateToken && token) {
      this.invalidateToken();
      const tokenizedUrl = tokenizeUrl(newUrl, token);
      const queriedUrl = this.applyQueryParameters(tokenizedUrl);
      return queriedUrl;
    }

    return this.applyQueryParameters(
      parsed.protocol + '//' + parsed.host + parsed.pathname,
    );
  }

  applyQueryParameters = url => {
    const queryParameters = qs.stringify(this.props.queryParameters);
    const toolbarQuery = this.props.options.hideToolbars
      ? '&:toolbar=no'
      : '&:toolbar=yes';
    const hideShareQuery =
      this.props.hideShare && !this.props.options.hideToolbars
        ? '&:showShareOptions=false'
        : '';
    const queriedUrl =
      url +
      '?:embed=yes' +
      toolbarQuery +
      hideShareQuery +
      (queryParameters ? queryParameters : '');

    console.log('thequeriedurl', queriedUrl);
    return queriedUrl;
  };

  initTableau(nextUrl) {
    if (__SERVER__) return;
    const vizUrl = this.getUrl(nextUrl);
    const options = {
      ...this.props.filters,
      ...this.props.parameters,
      sheetname: this.props.sheetname || '',
      url: vizUrl || '',
      onFirstInteractive: () => {
        this.workbook = this.viz.getWorkbook();
        let activeSheet = this.workbook.getActiveSheet();
        const saveData = {
          url: this.props.url,
          sheetname: this.props.sheetname,
          filters: { ...this.props.filters },
        };
        saveData['url'] = this.viz.getUrl();
        saveData['sheetname'] = activeSheet.getName();
        if (
          this.props.url !== saveData['url'] ||
          this.props.sheetname !== saveData['sheetname']
        ) {
          this.onChange(saveData);
        }

        this.viz.addEventListener(
          this.api.tableauSoftware.TableauEventName.TAB_SWITCH,
          e => {
            let newSheetname = e.getNewSheetName();
            this.viz.getCurrentUrlAsync().then(newUrl => {
              if (
                this.props.sheetname !== newSheetname ||
                this.props.url !== newUrl
              ) {
                saveData['sheetname'] = newSheetname;
                saveData['url'] = newUrl;
                this.onChange(saveData);
              }
            });
          },
        );

        this.viz.addEventListener(
          this.api.tableauSoftware.TableauEventName.FILTER_CHANGE,
          e => {
            e.getFilterAsync().then(r => {
              if (r.$appliedValues.length > 1) {
                delete saveData['filters'][r.$caption];
              } else if (r.$appliedValues.length === 1) {
                saveData['filters'][r.$caption] = r.$appliedValues[0].value;
              }
              if (
                JSON.stringify(saveData['filters']) !==
                JSON.stringify(this.props.filters)
              ) {
                this.onChange(saveData);
              }
            });
          },
        );
      },
    };

    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }

    this.viz = new this.api.tableauSoftware.Viz(
      this.container,
      vizUrl,
      options,
    );
  }

  render() {
    if (__SERVER__) return '';
    return <div ref={c => (this.container = c)} />;
  }
}

Tableau.propTypes = propTypes;
Tableau.defaultProps = defaultProps;

export default Tableau;
