import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import getUser from '../actions/getUser';
import {
  updateUser,
  clearUpdateUserState
} from '../actions/updateUser';

/**
 * @classdesc returns Settings component
 */
class Settings extends Component {
  /**
   * @description Created an instance of Settings
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillMount() {
    this.props.getUser(this.props.auth.user.id);
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { user, updatedOrNot } = nextProps;
    this.setState({
      email: user.user.email,
      name: updatedOrNot.response.name,
    });
    const { name, message } = updatedOrNot.response;
    if (message) {
      toastr.success(message);
      this.setState({
        isLoading: false
      });
    }
    if (updatedOrNot.errors.message) {
      toastr.error(updatedOrNot.errors.message);
      this.setState({
        isLoading: false
      });
    }
  }
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearUpdateUserState();
    const { user } = this.props.user;
  }
  /**
   * @description Read input form
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @description Handles form submission
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
    this.props.clearUpdateUserState();
    this.props.updateUser(this.props.auth.user.id, this.state);
  }
  /**
   * @return {XML} JSX
   */
  render() {
    const { user } = this.props.user;
    const { name } = this.props.updatedOrNot.response;
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        {user.name &&
        <div className="contents">
          {this.state.isLoading ? <h5>Please wait...</h5> : '' }
          <div className="card-enlarge form-card mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <h5> Update User Details</h5>
              <span className="star">Membership level: {this.props.auth.user.star}</span>
              <div
                className="card-content card-wrapper input-wrapper">
                <input
                type="email"
                name="email" id="email"
                value={this.state.email}
                disabled
                />
              </div>
              <div
                className="card-content card-wrapper input-wrapper">
                <input
                type="text"
                className=""
                onChange={this.onChange}
                name="name" id="name"
                value={this.state.name}
                />
              </div>
              <button
                disabled={this.state.isLoading}
                className={mdlButtonStyle}
                id="button">
                  update
              </button>
            </form>
            <div className="mdl-card__supporting-text">
              <Link to="/set-password">Change Password </Link>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}
/**
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.getUser,
  updatedOrNot: state.updateUser
});
export default connect(mapStateToProps, {
  getUser,
  updateUser,
  clearUpdateUserState
})(Settings);
