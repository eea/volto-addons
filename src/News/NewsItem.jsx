import React, { useState, useEffect } from 'react';
import { Icon } from '@plone/volto/components';

import downKey from '@plone/volto/icons/down-key.svg';
import upKey from '@plone/volto/icons/up-key.svg';


const NewsItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  const prettyDate = (time) => {
    let date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

    return day_diff == 0 && (
    diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
  }

  return (
    <article key={item['@id']}>
      <span onClick={() => setExpanded(!expanded)} className="article-headline" title={item.title}>
        { expanded ? 
          (<Icon name={upKey} size="16px" color="#005454" />) : 
          (<Icon name={downKey} size="16px" color="#005454" /> )
        }
        {item.title}
      </span>
      <div className={expanded ? 'expanded article-body' : 'article-body'}>
        <div className={'meta-data'}>
          {item.date && (
            <div className="text-tab">
              <span className="format-text">Published: </span>
              <span className="format-type">{prettyDate(item.date)}</span>
            </div>
          )}
        </div>
        <div className={'article-content'}>
          {item.description && (
            <div className="block">
              <span className="description">{item.description}</span>
            </div>
          )}
          <div className="actions">
            <span>See all</span>
            <span className="divider"></span>
            <span>Subscribe</span>
          </div>
        </div>
      </div>

    </article>
  );
};

export default NewsItem;
