import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import SingleNotification from '../../components/Notification.jsx';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<SingleNotification />', () => {
  const props = {
    notification: {
      message: 'eze goes to school',
      bookId: 1
    },
  };
  it('renders <SingleNotification /> component', () => {
    const shallowComponent = shallow(<SingleNotification {...props} />);
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});
