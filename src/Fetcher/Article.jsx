import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

const Article = ({ img, title, date, description, url }) => {
	return (
		<div className="article-list-row">
			<img className="article-img" src={img} />
			<Grid.Column>
				<p className="article-title">{title}</p>
				<p class="article-date">{date}</p>
				<p className="article-description">{description}</p>
				<a className="read-article" target="_blank" href={url}>
					READ ARTICLE
				</a>
			</Grid.Column>
		</div>
	);
};

export default Article;
