import React, { Component } from 'react';

/**
 * @param {props} props
 * @return {XML} JSX
 */
const Restrict = props =>
  (
    <div className="ask">
      {`This page is restricted to ${this.props.params.key}s only `}
    </div>
  );


export default Restrict;
