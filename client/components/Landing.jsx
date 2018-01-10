import React, { Component } from 'react';
import { Link } from 'react-router';

const mdlStyle = `
  mdl-button
  mdl-js-button
  mdl-button--raised
  mdl-button--colored
`;
/**
 * returns the Landing page
 * @param {object} props
 * @return {XML} jsx
 */
const Landing = props => (
  <div>
    <div className="page-content body overlay">
      <div className="mdl-grid">
        <div className="content landing-title">
          <h1> HelloBooks</h1>
          <hr />
          <h3 id="green">...read a book today</h3>
          <Link to="/signin">
            <button
            name="getStarted"
            className={mdlStyle}>
                Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
export default Landing;
