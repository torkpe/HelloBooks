import React, { Component } from 'react';

const PasswordForm = props => (
  <div>
    <div
    className="mdl-textfield mdl-js-textfield card-content">
      <input
      type="password" onChange={props.onChange}
      className="mdl-textfield__input" name="password" />
      <label htmlFor="password" className="mdl-textfield__label">
        New Password
      </label>
      <span className="error" />
    </div>
    <div
      className="mdl-textfield mdl-js-textfield card-content">
      <input
      type="password" onChange={props.onChange}
      className="mdl-textfield__input" name="confirmPassword" />
      <label
        htmlFor="password"
        className="mdl-textfield__label">
        Confirm Password
      </label>
      <span className="error" />
    </div>
  </div>
);
export default PasswordForm;
