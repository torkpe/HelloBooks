import React, { Component } from 'react';

class Restrict extends Component {
  render() {
    return (
      <div className="ask">
        {`This page is restricted to ${this.props.params.key}s only `}
      </div>
    );
  }
}


export default Restrict;
