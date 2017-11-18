import React, { Component } from 'react';
import 
class Request extends Component {
  render() {
    return (
      <div className="ask">
        {`This page is restricted to ${this.props.params.key}s only `}
      </div>
    );
  }
}


export default Request;
