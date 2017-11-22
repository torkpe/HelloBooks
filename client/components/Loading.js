import React, { Component } from 'react';

class Loading extends Component {
  render() {
    if (!this.props.isLoading) {
      return null;
    }
    return (
      <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate" />
    );
  }
}

export default Loading;
