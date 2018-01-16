import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import storeConfiguration from '../../store/store';
import connectedSignup, { Signup } from '../../components/Signup.jsx';

configure({ adapter: new Adapter() });

describe('<SignUp />', () => {
  const props = {
    userSignup: jest.fn(),
    clearSignupState: jest.fn(),
    signup: {
      isLoading: false,
      successfullySignedup: {
        message: 'mvhbvhjbbbb',
      },
      errors: {
        message: 'fdghjk'
      }
    },
    successfullySignedup: {
      message: 'mvhbvhjbbbb',
    },
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      username: 'okon',
      password: 'abcde',
      email: 'okon@yahoo.com',
    }
  };
  const mockStore = configureMockStore();
  let mountedComponent;
  let store;
  let wrapper;
  let shallowComponent;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    mountedComponent = mount(<Signup {...props} />);
    shallowComponent = shallow(<Signup {...props} />);
    wrapper = mount(<Provider store={storeConfiguration()}><connectedSignup /></Provider>);
  });
  it('renders <SignUp /> component', () => {
    const tree = toJson(mountedComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls handleChange event', () => {
    sinon.spy(Signup.prototype, 'onChange');
    shallowComponent.instance().onChange(event);
    expect(Signup.prototype.onChange.calledOnce).toEqual(false);
  });
  it('calls handle signup event after signup button is clicked', () => {
    sinon.spy(Signup.prototype, 'onSubmit');
    props.successfullySigned = {
      message: 'mvhbvhjbbbb'
    };
    event = {
      preventDefault: jest.fn()
    };
    shallowComponent = shallow(<Signup {...props} />);
    shallowComponent.instance().onSubmit(event);
    expect(Signup.prototype.onSubmit.calledOnce).toEqual(true);
  });
  it('calls componentWillReceiveProps', () => {
    sinon.spy(Signup.prototype, 'componentWillReceiveProps');
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Signup.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
  it('calls componentWillReceiveProps when there is no error message', () => {
    props.signup.errors.message = null;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Signup.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });
});
