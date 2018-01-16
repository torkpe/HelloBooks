import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import storeConfiguration from '../../store/store';
import connectedchangePassword, { ChangePassword }  from '../../components/ChangePassword.jsx';
configure({ adapter: new Adapter() });

describe('<ChangePassword />', () => {
  const props = {
    setPassword: jest.fn(),
    clearSetPasswordState: jest.fn(),
    auth: {
      user: {
        id: 1
      }
    },
    passwordChange: {
      response: {
        message: 'cghjklhkgjf'
      },
      errors: {
        message: 'dfghjklhgfhj'
      }
    }
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      oldPassword: 'gfhjk',
      password: 'bjnkl',
      confirmPassword: 'hjkjhk'
    }
  };
  const initialState = {
    isLoading: false,
    errors: {},
    successfullySignedup: {},
  };
  const mockStore = configureMockStore();
  let mountedComponent;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    mountedComponent = mount(<ChangePassword {...props} />);
    wrapper = mount(<Provider store={storeConfiguration()}><connectedchangePassword /></Provider>);
  });
  it('renders <ChangePassword /> component', () => {
    const tree = toJson(mountedComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls handleChange event', () => {
    sinon.spy(ChangePassword.prototype, 'onChange');
    mountedComponent.instance().onChange(event);
    expect(ChangePassword.prototype.onChange.calledOnce).toEqual(false);
  });
  it('calls submit event', () => {
    sinon.spy(ChangePassword.prototype, 'onSubmit');
    const event = {
      preventDefault: jest.fn(),
      clearSetPasswordState: jest.fn()
    }
    const shallowComponent = shallow(<ChangePassword {...props} />);
    shallowComponent.instance().onSubmit(event);
    expect(ChangePassword.prototype.onSubmit.calledOnce).toEqual(true);
  });
  it('calls clearSetPasswordState', () => {
    const shallowComponent = shallow(<ChangePassword {...props} />);
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent.instance().props.clearSetPasswordState).toHaveBeenCalled();
  });
  it('calls componentWillReceiveProps', () => {
    const shallowComponent = shallow(<ChangePassword {...props} />);
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(shallowComponent.instance().state.isLoading).toEqual(false);
  });
});