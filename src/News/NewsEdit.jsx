import React, { Component } from 'react';

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
    return (<h1>News Edit</h1>)
  }
}

export default NewsEdit;