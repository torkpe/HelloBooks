import React, { Component } from 'react';

/**
 * @description Render restrict page
 * 
 * @param {props} props
 * 
 * @return {XML} JSX
 */
const Restrict = props =>
  (
    <div className="ask">
      {`This page is restricted to ${this.props.params.key}s only `}
    </div>
  );


export default Restrict;
