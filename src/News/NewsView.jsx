import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import NewsItem from './NewsItem';
import WidthBasedLayoutProvider from 'volto-base/components/theme/LayoutProvider/WidthBasedLayoutProvider';
import { settings } from '~/config';
import './style.css';

const panes = context => [
  {
    menuItem: 'News',
    render: () => {
      return (
        <RenderItems
          items={context.newsItems}
          type="news"
        />
      )
    }
  },
  {
    menuItem: 'Events',
    render: () => {
      return (
        <RenderItems
          items={context.eventsItems}
          type="events"
        />
      )
    }
  },
  {
    menuItem: 'Subscribe via RSS',
    render: () => 
      <Tab.Pane>
        <p>RSS is a format to share data, defined in XML, that contains information about news and events.</p>
        <p>You have to use a RSS reader so that you can subscribe to our feed.</p>
        <p>You can find more information about RSS <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">here</a> and you can check our feed <a href={settings.apiPath + '/news/RSS'} target="_blank">here</a>.</p>
      </Tab.Pane>
  }
]

class NewsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsItems: [],
      eventsItems: [],
      grid: {
        phone: 'twelve',
        tablet: 'twelve',
        desktop: 'twelve',
        widescreen: 'twelve',
      },
      
    }
  }

  componentDidMount() {
    const newsItems = this.getPortletItems('news');
    const eventsItems = this.getPortletItems('events');
    this.setState({ newsItems, eventsItems });
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
    const context = {
      newsItems: this.state.newsItems,
      eventsItems: this.state.eventsItems
    }
    if (__SERVER__) return (<h1>News &amp; Events</h1>);
    return (
      <div className={`news-wrapper-view ${this.props.layout_type}-${this.state.grid[this.props.layout_type]}`}>
        <Tab panes={panes(context)} />
      </div>
    );
  }
}

const RenderItems = ({ items, type }) => {
  return (
    <Tab.Pane>
      <div className="articles">
        { items && items.map((item) => {
          return (<NewsItem key={item['@id']} item={item}  />)
        })}
      </div>
      { items && items.length > 0 && (
          <div className="actions">
            <Link className="more-items" to={`/${type}`}>
              More { type }
            </Link>
          </div>
        )
      }
      { (!items || items.length == 0) && (
          <div className="message">
            <span>There are no { type } at the moment.</span>
          </div>
        )
      }
    </Tab.Pane>
  );
}

export default compose(
  connect(
    (state, props) => ({
      portletsManagers: state.portlets.managers
    })
  ),
)(WidthBasedLayoutProvider(NewsView));
