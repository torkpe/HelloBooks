import React, { Component } from 'react';
import { Link } from 'react-router';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="page-content body overlay">
          <div className="mdl-grid">
            <div className="content">
              <h1> Hello-Books</h1>
              <hr />
              <h3 id="green">...read a book today</h3>
              <Link to="/signin">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
