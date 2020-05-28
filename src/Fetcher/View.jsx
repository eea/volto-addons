/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Grid, Pagination } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import Article from './Article';

const View = (props) => {
    const [activePage, setActivePage] = useState(1);

    const renderComponent = props.data.renderComponent
    const articles = props.data.articles ? props.data.articles : '';
    const articlesPerPage = 3;
    const articlesPaginated = [...articles].slice(
        (activePage - 1) * articlesPerPage,
        activePage * articlesPerPage,
    );

    const totalPages = parseInt(articles.length / articlesPerPage);

    const handlePaginationChange = (e, { activePage }) => {
        setActivePage(activePage);
    };

    return (
        <div style={{ marginBottom: "40px", marginTop: "40px" }}>
            <Grid columns={1}>
                {articles && renderComponent === "articleList" && (
                    <Grid.Column>
                        {articlesPaginated.map((article, id) => (
                            <Article
                                key={id}
                                img={`https:readreidread.files.wordpress.com/2011/09/yellow_tree1.jpg?w=998&h=624`}
                                title={article.title.value}
                                description={
                                    article.description.value
                                }
                                url={article.uri.value}
                                date={new Date(article.published.value).toLocaleDateString()}
                            />
                        ))}
                        <Pagination
                            activePage={activePage}
                            onPageChange={handlePaginationChange}
                            totalPages={totalPages}
                        />
                    </Grid.Column>
                )}
            </Grid>
        </div>
    );
}

export default injectIntl(View);
