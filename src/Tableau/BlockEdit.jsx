import React, { Component } from 'react';
import clearSVG from '@plone/volto/icons/clear.svg';
import { Button, Input} from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';

import { ResponsiveContainer } from 'recharts';

import TableauReport from './TableauReport';

// import PropTypes from 'prop-types';
// const url = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';

class StackedBarChart extends Component {
  constructor(props) {
    super(props);

    const data = this.props.data.tableauData;
    let show = !__SERVER__ && data ? true : false;

    let filters =
    data && data.filters && data.sheetname ? data.filters[data.sheetname] : {};

    this.state = {
      show,
      tableauData: data || '',
      url: data && data.url || '',
      filters,
      sheetname: data && data.sheetname || '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.saveCallback = this.saveCallback.bind(this);
  }
  componentDidCatch(e){
    console.log(e)
    this.setState({error: this.state.url, url: '', show: false})
  }

  handleChange(e) {
    let data = e.target.value;
    try {
      data = e.target.value;
      this.setState(
        {
          url: data,
          error: false
        },
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
    return tableauData;
  }

  render() {
    if (__SERVER__) return '';
    // const TableauReport = require('tableau-react');
    // console.log(this.state);
    //

    console.log('showValue', this.state)
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
                     onClick={() =>{
                       this.setState({url: '', show: false})
                       this.props.onChangeBlock(this.props.block, {
                         ...this.props.data,
                         tableauData: '',
                         filters: '',
                         url: '',
                         sheetname: '',
                        })
                      }
                    }
                   >
                     <Icon name={clearSVG} size="24px" color="#e40166" />
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
                {this.state.error && <h2 style={{color: 'red', fontWeight: 'bold'}}>The url "{this.state.error}" is not a valid tableau url</h2>}

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
            onKeyPress={(event) => { if (event.key === 'Enter') this.setState({show: true}) }}
            style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.3rem', boxShadow: '0px 1px 2px 0 rgba(34, 36, 38, 0.15)', border: '1px solid rgba(34, 36, 38, 0.15)', background: '#fafafa'}}
          >
            <label>{this.state.show && this.state.url ? 'Change' : 'Add'} tableau URL: &nbsp;</label>
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
