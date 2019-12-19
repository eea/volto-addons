import React, { Component } from 'react';
import clearSVG from '@plone/volto/icons/clear.svg';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';

import { ResponsiveContainer } from 'recharts';

import TableauReport from './TableauReport';

// import PropTypes from 'prop-types';
// const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';

class StackedBarChart extends Component {
  constructor(props) {
    super(props);

    const data = this.props.data.tableauData || {};
    let show = !__SERVER__ && data ? true : false;

    let filters =
      data.filters && data.sheetname ? data.filters[data.sheetname] : {};

    this.state = {
      show,
      tableauData: data,
      url: data.url || '',
      filters,
      sheetname: data.sheetname || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.saveCallback = this.saveCallback.bind(this);
  }

  handleChange(e) {
    let data = e.target.value;
    try {
      data = e.target.value;
      this.setState(
        {
          url: data,
        },
        // this.onSubmit,
      );
    } catch {
      console.warning('Invalid JSON data: ', data);
    }
  }

  onSubmit() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      tableauData: this.state.tableauData,
    });
    // this.props.handleClose();
  }

  saveCallback(saveData) {
    console.log('Received save data', saveData);
    let stateData = JSON.parse(JSON.stringify(this.state));
    this.setState(
      {
        tableauData: saveData,
      },
      this.onSubmit,
    );
  }

  getChartData() {
    let tableauData = this.state.tableauData;
    if (typeof tableauData == 'string') {
      try {
        tableauData = tableauData;
      } catch (error) {
        console.log(error);
        tableauData = {};
      }
    }
    console.log(tableauData);
    return tableauData;
  }

  render() {
    if (__SERVER__) return '';
    // const TableauReport = require('tableau-react');
    // console.log(this.state);
    //
    //                <Button
    //                  icon
    //                  basic
    //                  onClick={() =>
    //                    this.props.onChangeBlock(this.props.block, {
    //                      ...this.props.data,
    //                      tableauData: '',
    //                      filters: '',
    //                      url: '',
    //                      sheetname: '',
    //                    })
    //                  }
    //                >
    //                  <Icon name={clearSVG} size="24px" color="#e40166" />
    //                </Button>
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
                </Button.Group>
              </div>

              <ResponsiveContainer>
                <TableauReport
                  url={this.state.url}
                  filters={this.state.filters}
                  sheetname={this.state.sheetname}
                  callback={this.saveCallback}
                />
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="image-add">
              <div class="ui segment">
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
          <div>
            <label>Enter JSON data</label>
            <input
              type="text"
              defaultValue={this.state.url}
              placeholder="Enter tableau URL"
              onChange={this.handleChange}
            />
            <Button onClick={() => this.setState({ show: true })}>
              Show dashboard
            </Button>
            <Button onClick={this.onSubmit}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default StackedBarChart;
