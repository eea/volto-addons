import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Icon } from '@plone/volto/components';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import rss from '@plone/volto/icons/rss.svg';
import { settings } from '~/config';
import './style.css'

class NewsView extends Component {
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
          items = portlet[portletId + 'portlet']?.items.sort((a, b) => {
            return new Date(b.effective) - new Date(a.effective)
          })
        }
      })
    })
    return items
  }

  render() {
    if (__SERVER__) return (<h1>News</h1>);
    return (
      <div className={`news-wrapper-view ${this.props.layout_type}-${this.state.grid[this.props.layout_type]}`}>
        <div className={'headline'}>
          <h5>{this.props.data?.block_title || 'News'}</h5>
          <Label className="rss-feed" as='a' size="large" href={settings.apiPath + '/news/RSS'} target="_blank" color="teal">
            <span>Subscribe via RSS</span>
            <Icon name={rss} size="14px" />
          </Label>
        </div>
        <div className="articles">
          { this.state.newsItems && this.state.newsItems.map((item) => {
            return (<NewsItem key={item['@id']} item={item}  />)
          })}
        </div>
        <div className="actions">
          <Link className="more-news" to='/news'>
            More news
          </Link>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(
    (state, props) => ({
      portletsManagers: state.portlets.managers
    })
  ),
)(WidthBasedLayoutProvider(NewsView));
