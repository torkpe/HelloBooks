import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { sendPasswordResetLink, clearSendPasswordResetLinkState } from '../actions/user';
import EmailForm from './EmailForm.jsx';

/**
 * @classdesc return ForgotPassword component
 */
class ForgotPassword extends Component {
  /**
   * @description Created an instance of ForgotPassword
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefied} undefined
   */
  componentWillReceiveProps(nextProps) {
    const { successfullySentLink, error } = nextProps.sendLinkSuccessful;
    if (successfullySentLink && Object.keys(successfullySentLink).length > 0) {
      toastr.success(successfullySentLink.message);
      this.setState({
        isLoading: false
      });
    }
    if (error) {
      toastr.error(error.message);
      this.setState({
        isLoading: false
      });
    }
  }
  /**
   * @description React life cycle
   * 
   * @return {undefied} undefined
   */
  componentWillUnmount() {
    this.props.clearSendPasswordResetLinkState();
  }
  /**
   * @description Read input from form
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description  Handle form submission
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    this.props.clearSendPasswordResetLinkState();
    this.props.sendPasswordResetLink(this.state);
  }
  /**
   * @description renders ForgotPassword component
   * 
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
          {this.state.isLoading ? <h5>Please wait...</h5> : '' }
          <div className="card-enlarge form-card mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <h5>Forgot Passwod</h5>
              <EmailForm
                onChange={this.onChange}
              />
              <button
                disabled={this.state.isLoading}
                className={mdlButtonStyle}
                id="button">
                Submit
              </button>
            </form>
            <div
            className="mdl-card__supporting-text">
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
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
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
