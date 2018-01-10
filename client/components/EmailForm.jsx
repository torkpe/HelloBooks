import React, { Component } from 'react';

/**
 * @param {object} props
 * @return {object} prop
 */
const EmailForm = props => (
<div
className="card-content card-wrapper input-wrapper">
  <input
  type="email"
  onChange={props.onChange}
  name="email" id="email"
  placeholder="Email"
  />
</div>
);

export default EmailForm;
