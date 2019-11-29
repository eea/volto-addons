import React, { Component } from 'react';
import { settings } from '~/config';

class BlockView extends Component {
  getPath(url) {
    return url
      .replace(settings.apiPath, '')
      .replace(settings.internalApiPath, '');
  }

  render() {
    return (
      <div>
        {this.props.properties.items.length === 0 && <div>No children</div>}
        {this.props.properties.items.map(item => (
          <div>
            <a href={this.getPath(item['@id'])}>{item.title || item.Title}</a>
          </div>
        ))}
      </div>
    );
  }
}

export default BlockView;
