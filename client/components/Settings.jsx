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
 * @class Settings
 * @classdesc returns Settings component
 */
class Settings extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getUser(this.props.auth.user.id);
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { user, updatedOrNot } = nextProps;
    if (user) {
      this.setState({
        email: user.email,
        name: user.name,
      });
    }
    if (updatedOrNot.response.message) {
      toastr.success(updatedOrNot.response.message);
    }
    if (updatedOrNot.errors.message) {
      toastr.error(updatedOrNot.errors.message);
    }
  }
  /**
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearUpdateUserState();
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.clearUpdateUserState();
    this.props.updateUser(this.props.auth.user.id, this.state);
  }
  /**
   * @return {XML} JSX
   */
  render() {
    const mdlButtonStyle = `
    mdl-button
    mdl-js-button
    mdl-button--raised
    mdl-button--colored
    `;
    return (
      <div className="mdl-grid">
        {Object.keys(this.props.user).length > 0 &&
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form onSubmit={this.onSubmit}>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="email" onChange={this.onChange}
                  className="mdl-textfield__input"
                  disabled value={this.state.email} name="email" />
                <span className="error" />
              </div>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" onChange={this.onChange}
                  className="mdl-textfield__input" defaultValue={
                    this.state.name
                  } name="name" />
                <span className="error" />
              </div>
              <button
                className={mdlButtonStyle}
                id="button">
                  update
              </button>
            </form>
            <div className="mdl-card__supporting-text ask">
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
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.getUser.user,
  updatedOrNot: state.updateUser
});
export default connect(mapStateToProps, {
  getUser,
  updateUser,
  clearUpdateUserState
})(Settings);
