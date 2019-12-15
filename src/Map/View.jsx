import React, { Component } from 'react';

class MapView extends Component {
  render() {
    return (
      <div className="embeddedcontent-view">
        {this.props.content.text ? (
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.content.text.data,
            }}
          />
        ) : (
          ''
        )}
        {this.props.content.embed_code ? (
          <div
            className="map-view"
            dangerouslySetInnerHTML={{
              __html: this.props.content.embed_code,
            }}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default MapView;
