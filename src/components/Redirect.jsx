import React, { Component } from 'react';

class Redirect extends Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            Thank you for signing up, please check your email for to finish registration
          </div>
        </div>
      </div>
    );
  }
}

export default Redirect;
