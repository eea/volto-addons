import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Parser from 'rss-parser';
import { settings } from '@plone/volto/config';
import { blocks as customBlocks } from '~/config';

const RssBody = ({ data }) => {
  const [feedItems, setFeedItems] = useState([]);
  useEffect(() => {
    let parser = new Parser();
    if (data?.feed?.length > 0) {
      let base_url = settings.apiPath;
      parser.parseURL(base_url + '/@get_rss_feed?feed=' + data.feed, function(
        err,
        feed,
      ) {
        if (err) throw err;
        setFeedItems(feed.items.slice(0, data?.feedItemNumber));
      });
    }
  }, [data]);

  const templateConfig = customBlocks.blocksConfig.rssBlock.templates;

  let templateName =
    data.template && !!templateConfig[data.template]
      ? data.template
      : 'default';

  const ListingBodyTemplate = templateConfig[templateName].template;

  return <ListingBodyTemplate items={feedItems} />;
};

RssBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RssBody;
