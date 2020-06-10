import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewsItem = ({ item }) => {
  const prettyDate = time => {
    let date = new Date(time);
    const dtf = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const [{ value: da }, , { value: mo }, , { value: ye }] = dtf.formatToParts(
      date,
    );
    return `${da} ${mo} ${ye}`;
  };

  const prettyDateTime = time => {
    const dtf = Intl.DateTimeFormat('en-GB', {
      // weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/Copenhagen',
      timeZoneName: 'short',
    });

    const [
      { value: da },
      ,
      { value: mo },
      ,
      { value: ye },
      ,
      { value: hh },
      ,
      { value: mm },
      ,
      { value: tz },
      ,
    ] = dtf.formatToParts(new Date(time));

    return `${da} ${mo} ${ye} ${hh}:${mm} ${tz}`;
  };

  const itemPath = urlString => {
    const url = new URL(urlString);
    return url.pathname.replace('/fise', '');
  };

  return (
    <article key={item['@id']}>
      <Link
        className="article-headline"
        title={item.title}
        to={itemPath(item['@id'])}
      >
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
          {item.start && item.end && (
            <div className="event-dates">
              <div className="text-tab">
                <span className="format-text">Starting: </span>
                <span className="format-type">
                  {prettyDateTime(item.start)}
                </span>
              </div>
              <div className="text-tab">
                <span className="format-text">Ending: </span>
                <span className="format-type">{prettyDateTime(item.end)}</span>
              </div>
            </div>
          )}
          {item.location && (
            <div className="text-tab">
              <span className="format-text">Location: </span>
              <span className="format-type">{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
