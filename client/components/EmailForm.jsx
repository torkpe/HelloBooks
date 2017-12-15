import React, { Component } from 'react';

/**
 * @param {object} props
 * @return {object} prop
 */
const EmailForm = props => (
  <div
    className="mdl-textfield mdl-js-textfield card-content">
    <input
      type="email"
      onChange={props.onChange}
      className="mdl-textfield__input"
      name="email" />
    <label
      htmlFor="email"
      className="mdl-textfield__label">
      Email
    </label>
  </div>
);

export default EmailForm;
