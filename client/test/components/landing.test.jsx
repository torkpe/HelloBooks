import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import storeConfiguration from '../../store/store';
import Landing from '../../components/Landing.jsx';
configure({ adapter: new Adapter() });

describe('<Landing />', () => {
  it('renders <Landing /> component', () => {
    const wrapper = shallow(<Landing />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});