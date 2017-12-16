import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { sendPasswordResetLink, clearSendPasswordResetLinkState } from '../actions/user';
import EmailForm from './EmailForm.jsx';

/**
 * @class ForgotPassword
 * @classdesc return ForgotPassword component
 */
class ForgotPassword extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { successfullySentLink, error } = nextProps.sendLinkSuccessful;
    if (successfullySentLink && Object.keys(successfullySentLink).length > 0) {
      toastr.success(successfullySentLink.message);
    }
    if (error) {
      toastr.error(error.message);
    }
  }
  /**
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearSendPasswordResetLinkState();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearSendPasswordResetLinkState();
    this.props.sendPasswordResetLink(this.state);
  }
  /**
   * renders ForgotPassword component
   * @return {XML} JSX
   */
  render() {
    const span = <span />;
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <EmailForm
                onChange={this.onChange}
              />
              <button
                className={mdlButtonStyle}
                id="button">
                Submit
              </button>
            </form>
            <div
            className="mdl-card__supporting-text ask">
              Go back to <Link to="/signin"> Sign in</Link> page
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  sendPasswordResetLink: propTypes.func.isRequired,
  clearSendPasswordResetLinkState: propTypes.func.isRequired,
};
/**
 * returns props
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  sendLinkSuccessful: state.sendPasswordResetLink
});
export default connect(
  mapStateToProps,
  {
    sendPasswordResetLink,
    clearSendPasswordResetLinkState
  }
)(ForgotPassword);
