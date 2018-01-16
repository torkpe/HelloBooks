import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { Notifications }  from '../../components/Notifications.jsx';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<Notifications />', () => {
  const props = {
    getNotification: jest.fn(),
    auth: {
      user: {
        id: 1,
        star: 'bronze'
      }
    },
    notifications: [
      {
        message: 'fcjhkjhgcnbvnm,',
        bookId: 2
      },
      {
        message: 'fcjhkjhgcnbvnm,',
        bookId: 3
      },
      {
        message: 'fcjhkjhgcnbvnm,',
        bookId: 4
      },
    ],
  }
  let shallowComponent;
  beforeEach(() => {
    shallowComponent = shallow(<Notifications {...props} />);
  });
  it('renders <Notifications /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
  it('checks if notifications is less than 0', () => {
    props.notifications = [];
    const shallowComponent = shallow(<Notifications {...props} />);
    expect(shallowComponent.instance().props.notifications.length < 1).toEqual(true);
  });
});