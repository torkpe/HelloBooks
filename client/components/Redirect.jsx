import React, { Component } from 'react';

/**
 * @param {object} props
 * @return {XML} JSX
 */
const Redirect = props => (
  <div className="mdl-grid">
    <div className="contents">
      <div className="card-enlarge mdl-card mdl-shadow--3dp redirect-card">
        <div className="redirect">
          <h5>Thank you for signing up, please check your email for to finish registration</h5>
        </div>
      </div>
    </div>
  </div>
);

export default Redirect;
