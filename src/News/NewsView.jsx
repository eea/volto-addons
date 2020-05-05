import React, { useState, useEffect } from 'react';
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
      return <RenderItems items={context.newsItems} type="news" />;
    },
  },
  {
    menuItem: 'Events',
    render: () => {
      return <RenderItems items={context.eventsItems} type="events" />;
    },
  },
  {
    menuItem: 'Subscribe via RSS',
    render: () => (
      <Tab.Pane>
        <p>
          RSS is a format to share data, defined in XML, that contains
          information about news and events.
        </p>
        <p>
          You have to use a RSS reader so that you can subscribe to our feed.
        </p>
        <p>
          You can find more information about RSS and you can check our feed{' '}
          <Link to="rss-feed" className="ui primary button" target="_blank">
            {' '}
            Here
          </Link>
        </p>
      </Tab.Pane>
    ),
  },
];

const getPortletItems = (portletsManagers, portletId) => {
  let items = null;
  Object.keys(portletsManagers).forEach(manager => {
    portletsManagers[manager].forEach(portlet => {
      if (portlet.portlet_id === portletId) {
        items = portlet[portletId + 'portlet']?.items.sort((a, b) => {
          return new Date(b.effective) - new Date(a.effective);
        });
      }
    });
  });
  return items;
};

const RenderItems = ({ items, type }) => {
  return (
    <Tab.Pane>
      <div className="articles">
        {items &&
          items.map(item => {
            return <NewsItem key={item['@id']} item={item} />;
          })}
      </div>
      {items && items.length > 0 && (
        <div className="actions">
          <Link className="more-items" to={`/${type}`}>
            More {type}
          </Link>
        </div>
      )}
      {(!items || items.length == 0) && (
        <div className="message">
          <span>There are no {type} at the moment.</span>
        </div>
      )}
    </Tab.Pane>
  );
};

const NewsView = props => {
  const [newsItems, setNewsItems] = useState();
  const [eventsItems, setEventsItems] = useState();

  const grid = {
    phone: 'twelve',
    tablet: 'twelve',
    desktop: 'twelve',
    widescreen: 'twelve',
  };

  useEffect(() => {
    setNewsItems(
      getPortletItems(props.portletsManagers, 'news')?.sort((a, b) => {
        return new Date(b.effective) - new Date(a.effective);
      }),
    );
    setEventsItems(
      getPortletItems(props.portletsManagers, 'events')?.sort((a, b) => {
        return new Date(b.start) - new Date(a.start);
      }),
    );
  }, [newsItems, eventsItems, props.portletsManagers]);

  if (__SERVER__) return <h1>News &amp; Events</h1>;

  return (
    <div
      className={`news-wrapper-view ${props.layout_type}-${
        grid[props.layout_type]
      }`}
    >
      <Tab panes={panes({ newsItems, eventsItems })} />
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    portletsManagers: state.portlets.managers,
  })),
)(WidthBasedLayoutProvider(NewsView));
