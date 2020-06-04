import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import RssSyle from './RssStyle';

const messages = defineMessages({
  selectRssOptions: {
    id: 'selectRSSOptions',
    defaultMessage: 'Select options',
  },
  RssFeed: {
    id: 'RssFeed',
    defaultMessage: 'RSS Feed',
  },
  setrss: {
    id: 'setrss',
    defaultMessage: 'Set RSS feed',
  },
  RssFeedItemNumber: {
    id: 'RssFeedItemNumber',
    defaultMessage: 'Number of items to show',
  },
});

const RssSidebar = ({ data, block, onChangeBlock, required = false }) => {
  const intl = useIntl();
  const [template, setTemplate] = useState(data.template || 'default');
  const [feed, setFeed] = useState(data.feed || '');
  const [feedItemNumber, setFeedItemNumber] = useState(
    data.feedItemNumber || 10,
  );
  return (
    <Segment.Group raised>
      <Segment>
        <header className="header pulled">
          <h2>{intl.formatMessage(messages.selectRssOptions)}</h2>
        </header>
        <TextWidget
          id="RssFeed"
          title={intl.formatMessage(messages.RssFeed)}
          required={true}
          value={feed}
          onChange={(name, value) => {
            setFeed(value);
          }}
        />
        <TextWidget
          id="RssFeedItemNumber"
          title={intl.formatMessage(messages.RssFeedItemNumber)}
          required={true}
          value={feedItemNumber}
          onChange={(name, value) => {
            setFeedItemNumber(value);
          }}
        />
        <RssSyle
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          setTemplate={setTemplate}
        />
      </Segment>
      <Segment className="actions" clearing>
        <Button
          basic
          primary
          floated="right"
          type="submit"
          id="rss-form-submit"
          aria-label={intl.formatMessage(messages.setrss)}
          title={intl.formatMessage(messages.setrss)}
          onClick={() => {
            onChangeBlock(block, {
              ...data,
              template,
              feed,
              feedItemNumber,
            });
          }}
        >
          <Icon className="circled" name={aheadSVG} size="30px" />
        </Button>
      </Segment>
    </Segment.Group>
  );
};

RssSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default RssSidebar;
