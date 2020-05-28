import React, { Component, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Grid, Pagination } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getParentFolderData } from '~/actions';
import _ from 'lodash';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { BlockEditForm } from 'volto-addons/BlockForm';
import Article from './Article';
import { useCorsProxyAll, useCorsproxy } from '../helpers';

import schema from './schema';

//proxy atm
//https://cors-anywhere.herokuapp.com/

const SparqlClient = require('sparql-http-client');

const Edit = props => {
  const [articleList, setArticleList] = useState('');

  const [activePage, setActivePage] = useState(1);

  const [endpoint, setEndpoint] = useState('')

  const hasRequest = props.data.request || props.data.customRequest
  const hasQueryData = props.data.endpoint && hasRequest;


  const handleFetch = async () => {
    setEndpoint(props.data.endpoint)
    const endpointUrl = useCorsProxyAll(props.data.endpoint);
    const request = props.data.customRequest ? props.data.customRequest : props.data.request;

    console.log('éndpoin', endpointUrl)
    const client = new SparqlClient({ endpointUrl });
    const stream = await client.query.select(request);

    var fullItems = [];

    stream.on('data', row => {
      fullItems.push(row);
    });

    setArticleList(fullItems);

    props.onChangeBlock(props.block, {
      ...props.data,
      articles: fullItems,
    });

    stream.on('error', err => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (
      hasQueryData &&
      articleList !== props.data.articles &&
      endpoint !== props.data.endpoint
    ) {
      handleFetch();
    }
  }, [props.data.endpointUrl, props.data.request, props.data.customRequest]);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };


  const articles = props.data.articles ? props.data.articles : '';

  const articlesPerPage = 3;

  const articlesPaginated = [...articles].slice(
    (activePage - 1) * articlesPerPage,
    activePage * articlesPerPage,
  );

  const totalPages = parseInt(articles.length / articlesPerPage);

  return (
    <Grid columns={1}>
      {hasQueryData && !articles && <p>Loading..</p>}
      {articles && !props.data.renderComponent && <p>Please select Render Component to display fetched items</p>}
      {hasQueryData && articles && props.data.renderComponent === "articleList" && (
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
      {!hasQueryData && <p>Use Sidebar to set Endpoint and Query Data.</p>}
      <SidebarPortal selected={props.selected}>
        <BlockEditForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
          block={props.block}
        />
      </SidebarPortal>
    </Grid>
  );
};

const mapDispatchToProps = {
  getParentFolderData,
};

export default injectIntl(Edit)
