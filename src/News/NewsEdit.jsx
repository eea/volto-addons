import React, { Component } from 'react';
import NewsView from './NewsView';

class NewsEdit extends Component {
  constructor(props) {
    super(props);

    const data = this.props.data;
    let show = !__SERVER__ && data ? true : false;

    this.state = {
      show,
      url: (data && data.url) || '',
      error: false
    }
  }

  render() {
    return (<NewsView />)
  }
}

export default NewsEdit;