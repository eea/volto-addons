import React, { Component } from 'react';
import BlockView from './BlockView';

class CollectionView extends Component {
  render() {
    console.log(this.props);
    return (
      <BlockView
        data={{
          ...this.props.content,
          collection_url: this.props.location.pathname,
        }}
        block={this.props.location.pathname}
      />
    );
  }
}

export default CollectionView;
