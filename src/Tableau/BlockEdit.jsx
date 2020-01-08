import React, { Component } from 'react';

import { Button, Input } from 'semantic-ui-react';
import { defineMessages } from 'react-intl';
import { toast } from 'react-toastify';

import TableauReport from './TableauReport';

import clearSVG from '@plone/volto/icons/clear.svg';
import { Icon } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import { Toast } from '@plone/volto/components';
//
// import { ResponsiveContainer } from 'recharts';
//FormattedMessage, , injectIntl

const messages = defineMessages({
  readyForSave: {
    id: 'readyForSave',
    defaultMessage: 'Tableau is ready to be saved',
  },
  modifiedAndReadyForSave: {
    id: 'modifiedAndReadyForSave',
    defaultMessage: 'Your modifications are ready to be saved',
  },
});

class StackedBarChart extends Component {
  constructor(props) {
    super(props);

    const data = this.props.data;
    let show = !__SERVER__ && data ? true : false;

    let filters =
      data && data.filters && data.sheetname
        ? data.filters[data.sheetname]
        : {};

    this.state = {
      show,
      url: (data && data.url) || '',
      filters,
      sheetname: (data && data.sheetname) || '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.saveCallback = this.saveCallback.bind(this);
  }
  componentDidCatch(e) {
    console.log(e);
    this.setState({ error: this.state.url, url: '', show: false });
  }

  handleChange(e) {
    let data = e.target.value;
    try {
      data = e.target.value;
      this.setState({
        url: data,
        error: false,
      });
    } catch {
      console.warning('Invalid JSON data: ', data);
    }
  }

  onSubmit() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      filters: this.state.filters,
      url: this.state.url,
      sheetname: this.state.sheetname,
    });
    // this.props.handleClose();
    toast.success(
      <Toast
        sucess
        title={this.props.intl.formatMessage(messages.readyForSave)}
        // content={this.props.intl.formatMessage(messages.readyForSaveContent)}
      />,
      { autoClose: true, toastId: 'readyForSave' },
    );
  }

  saveCallback(saveData) {
    console.log('Received save data', saveData);
    this.setState(
      {
        ...saveData,
      },
      this.onSubmit,
    );
    toast.success(
      <Toast
        sucess
        title={this.props.intl.formatMessage(messages.modifiedAndReadyForSave)}
        // content={this.props.intl.formatMessage(messages.readyForSaveContent)}
      />,
      { autoClose: true, toastId: 'modifiedAndReadyForSave' },
    );
  }

  render() {
    if (__SERVER__) return '';
    // const TableauReport = require('tableau-react');
    // console.log(this.state);
    //

    // <ResponsiveContainer style={{ width: '100%', overflowX: 'auto' }}>
    // </ResponsiveContainer>
    console.log('showValue', this.state);
    return (
      <div className="block chartWrapperEdit">
        <div className="block-inner-wrapper">
          {this.state.show && this.state.url ? (
            <div class="image-add">
              <div className="toolbar">
                <Button.Group>
                  <Button
                    icon
                    basic
                    onClick={() => this.props.onDeleteBlock(this.props.block)}
                  >
                    <Icon name={trashSVG} size="24px" color="#e40166" />
                  </Button>
                  <Button
                    icon
                    basic
                    onClick={() => {
                      this.setState({ url: '', show: false });
                      this.props.onChangeBlock(this.props.block, {
                        ...this.props.data,
                        filters: '',
                        url: '',
                        sheetname: '',
                      });
                    }}
                  >
                    <Icon name={clearSVG} size="24px" color="#e40166" />
                  </Button>
                </Button.Group>
              </div>

              <TableauReport
                url={this.state.url}
                filters={this.state.filters}
                sheetname={this.state.sheetname}
                callback={this.saveCallback}
              />
            </div>
          ) : (
            <div className="image-add">
              <div class="ui segment">
                {this.state.error && (
                  <h2 style={{ color: 'red', fontWeight: 'bold' }}>
                    The url "{this.state.error}" is not a valid tableau url
                  </h2>
                )}

                <div class="ui placeholder">
                  <div class="image header">
                    <div class="line" />
                    <div class="line" />
                  </div>
                  <div class="paragraph">
                    <div class="medium line" />
                    <div class="short line" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            role="presentation"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.setState({ show: true });
                this.onSubmit();
              }
            }}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.3rem',
              boxShadow: '0px 1px 2px 0 rgba(34, 36, 38, 0.15)',
              border: '1px solid rgba(34, 36, 38, 0.15)',
              background: '#fafafa',
            }}
          >
            <label>
              {this.state.show && this.state.url ? 'Change' : 'Add'} tableau
              URL: &nbsp;
            </label>
            <Input
              type="text"
              className="remove-all-border-radius"
              defaultValue={this.state.url}
              value={this.state.url}
              placeholder="Tableau URL"
              onChange={this.handleChange}
            />
            &nbsp; and press ENTER
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBarChart;
