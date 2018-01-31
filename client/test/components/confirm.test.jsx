import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import storeConfiguration from '../../store/store';
import connectedConfirm, {
  Confirm
} from '../../components/Confirm.jsx';

configure({ adapter: new Adapter() });

describe('<Confirm />', () => {
  const props = {
    userConfirmationRequest: jest.fn(),
    clearUserConfirmationState: jest.fn(),
    authenticated: {
      user: {
        id: 1
      }
    },
    confirmationRequest: {
      confirmationSuccessful: {
        message: 'dgfhjkhgfghjhgf'
      },
      errors: {
        error: {
          message: 'dfghjgfdghjgf'
        }
      },
    },
    params: {
      key: 34567
    }
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'xbcnvmvncbxcvn',
      password: 'xbcnvmb,nvncb',
      confirmPassword: 'xbcvbvncbxvbnmvc',
      key: 'this.props.params.key,',
      confirmed: true,
    }
  };
  const initialState = {
    isLoading: false,
    errors: {},
    successfullySignedup: {},
  };
  const mockStore = configureMockStore();
  let shallowComponent;
  let store;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    shallowComponent = shallow(<Confirm {...props} />);
  });
  it('renders <Confirm /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls onSubmit method when signin button is clicked', () => {
    sinon.spy(Confirm.prototype, 'onSubmit');
    props.successfullySigned = {
      message: 'mvhbvhjbbbb'
    };
    shallowComponent = shallow(<Confirm {...props} />);
    shallowComponent.instance().onSubmit(event);
    expect(Confirm.prototype.onSubmit.calledOnce).toEqual(true);
  });
  it('calls componentWillReceiveProps', () => {
    shallowComponent = shallow(<Confirm {...props} />);
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(Object.keys(shallowComponent.instance()
      .props.authenticated.user).length > 0).toEqual(true);
  });
  it('calls clearUserConfirmState', () => {
    shallowComponent = shallow(<Confirm {...props} />);
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent.instance().props.clearUserConfirmationState)
      .toHaveBeenCalled();
  });
  it('calls handleChange event', () => {
    sinon.spy(Confirm.prototype, 'onChange');
    shallowComponent.instance().onChange(event);
    expect(Confirm.prototype.onChange.calledOnce).toEqual(false);
  });
});