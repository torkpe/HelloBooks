import React, { Component } from 'react';

/**
 * @param {object} props
 * @return {XML} JSX
 */
const PasswordForm = props => (
  <div>
    <div
      className="card-content card-wrapper input-wrapper">
      <input
      type="password"
      onChange={props.onChange}
      name="password" id="password1"
      placeholder="Password"
      />
    </div>
    <div
      className="card-content card-wrapper input-wrapper">
      <input
      type="password"
      onChange={props.onChange}
      name="confirmPassword" id="password"
      placeholder="Confirm Password"
      />
    </div>
  </div>
);
export default PasswordForm;
