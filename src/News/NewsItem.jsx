import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ item }) => {
  const prettyDate = (time) => {
    let date = new Date(time)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit' })
    const  [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date)
    return `${mo} ${da} ${ye}`
  }

  const prettyDateTime = (time) => {
    return Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(time));
  }

  const itemPath = (urlString) => {
    const url = new URL(urlString);
    return url.pathname.replace('/fise', '');
  }
  console.log(item)
  if (item.start && item.end) {
    console.log(new Date(item.start))
  }

  return (
    <article key={item['@id']}>
      <Link className="article-headline" title={item.title} to={itemPath(item['@id'])}>
        {item.title}
      </Link>
      <div className="expanded article-body">
        <div className={'meta-data'}>
          {item.effective && !(item.start && item.end) && (
            <div className="text-tab">
              <span className="format-text">Published: </span>
              <span className="format-type">{prettyDate(item.effective)}</span>
            </div>
          )}
          {item.start && (
            <div className="text-tab">
              <span className="format-text">Starting: </span>
              <span className="format-type">{prettyDateTime(item.start)}</span>
            </div>
          )}
          {item.end && (
            <div className="text-tab">
              <span className="format-text">Ending: </span>
              <span className="format-type">{prettyDateTime(item.end)}</span>
            </div>
          )}
        </div>
      </div>

    </article>
  );
};

export default NewsItem;
