import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ item }) => {
  const prettyDate = (time) => {
    let date = new Date(time)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit' })
    const  [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(date)
    return `${mo} ${da} ${ye}`
  }

  const itemPath = (urlString) => {
    const url = new URL(urlString);
    return url.pathname.replace('/fise', '');
  }

  return (
    <article key={item['@id']}>
      <Link className="article-headline" title={item.title} to={itemPath(item['@id'])}>
        {item.title}
      </Link>
      <div className="expanded article-body">
        <div className={'meta-data'}>
          {item.effective && (
            <div className="text-tab">
              <span className="format-text">Published: </span>
              <span className="format-type">{prettyDate(item.effective)}</span>
            </div>
          )}
        </div>
      </div>

    </article>
  );
};

export default NewsItem;
