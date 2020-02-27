import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getPortlets } from '../actions';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from '~/components/theme/LayoutProvider/WidthBasedLayoutProvider';

class NewsView extends Component {
  static propTypes = {
    getPortlets: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newsItems: [],
      grid: {
        phone: 'twelve',
        tablet: 'twelve',
        desktop: 'twelve',
        widescreen: 'twelve',
      }
    }
  }

  componentDidMount() {
    const newsItems = this.getPortletItems('news');
    this.setState({ newsItems });
  }

  getPortletItems(portletId) {
    let items = null
    Object.keys(this.props.portletsManagers).forEach(manager => {
      this.props.portletsManagers[manager].forEach(portlet => {
        if (portlet.portlet_id === portletId) {
          items = portlet[portletId + 'portlet'].items
        }
      })
    })
    return items
  }

  render() {
    if (__SERVER__) return (<h1>Bye World!</h1>);
    return (
      <div className={`news-wrapper-view ${this.props.layout_type}-${this.state.grid[this.props.layout_type]}`}>
        <span className={'headline'}>Latest news</span>
        { this.state.newsItems && this.state.newsItems.map((item) => {
          return (<NewsItem key={item['@id']} item={item}  />)
        })}
      </div>
    );
  }
}

export default compose(
  connect(
    (state, props) => ({
      portletsManagers: state.portlets.managers
    }),
    { getPortlets },
  ),
)(WidthBasedLayoutProvider(NewsView));