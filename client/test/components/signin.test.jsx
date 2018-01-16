import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import storeConfiguration from '../../store/store';
import ConnectedSigninPage, { Signin }  from '../../components/Signin.jsx';

configure({ adapter: new Adapter() });

const props = {
  userSignin: jest.fn(),
  clearSigninState: jest.fn(),
  signin: {
    isLoading: false,
    successfullySignedin: {
      myToken: 'yggjbhbjbhbjbhjbhjbhjvbhjvvhjvh'
    },
    errors: {
      message: 'mbnmn m,mm'
    },
  }
};
const event = {
  preventDefault: jest.fn(),
  target: {
    username: 'okon',
    password: 'abcde',
    email: 'okon@yahoo.com',
  }
};
const initialState = {
  userSignin: {
    successfullySignedin: {
      myToken: 'yggjbhbjbhbjbhjbhjbhjvbhjvvhjvh'
    },
    isLoading: false,
    successfullySignedin: {},
    errors: {
      message: 'mbnmn m,mm'
    },
  }
};
const mockStore = configureMockStore();
let mountedComponent;
let store;
let wrapper;
let shallowComponent;

describe('<Signin />', () => {
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    mountedComponent = mount(<Signin {...props} />);
    shallowComponent = shallow(<Signin {...props} />);
  });
  it('renders <Signin /> component', () => {
    const tree = toJson(mountedComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls componentWillReceiveProps', () => {
    sinon.spy(Signin.prototype, 'componentWillReceiveProps');
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Signin.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
  it('calls componentWillReceiveProps when there is no token', () => {
    props.signin.successfullySignedin.myToken = null;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Signin.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });
  it('calls componentWillReceiveProps when there is no error message', () => {
    props.signin.errors.message = null;
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Signin.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });
  it('calls handle Signup event after login button is clicked', () => {
    sinon.spy(Signin.prototype, 'onSubmit');
    props.signin.successfullySignedin.myToken = 'mvhbvhjbbbb';
    const shallowComponent = shallow(<Signin {...props} />);
    const event = {
      preventDefault: jest.fn()
    }
    shallowComponent.instance().onSubmit(event);
    expect(Signin.prototype.onSubmit.calledOnce).toEqual(true);
  });
  it('calls handleChange event', () => {
    sinon.spy(Signin.prototype, 'onChange');
    shallowComponent.instance().onChange(event);
    expect(Signin.prototype.onChange.calledOnce).toEqual(false);
  });
});
