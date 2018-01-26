import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import connectedHome, { Home } from '../../components/Home.jsx';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  const props = {
    auth: {
      user: {
        star: 'gh',
        id: 1
      },
    },
    getBooks: jest.fn(),
    books: [{
      title: 'eze goes to school',
      description: 'a boy from the village who finally went to school',
      id: 1,
      cover: 'xcgvhjkhcvbkjhgcvbjhcv',
      pdf: 'cghjklhgcfhgjkhgjh',
      quantity: 1,
      genre: 'eductaional'
    }],
    fetching: false,
    userId: 1,
    borrowedBooks: [{}]
  };
  const initialState = {
    fetching: false,
    books: [],
    errors: '',
  };
  const mockStore = configureMockStore();
  let mountedComponent;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    mountedComponent = mount(<Home {...props} />);
    wrapper = mount(<Provider store={storeConfiguration()}><connectedHome /></Provider>);
  });
  it('renders <Home /> component', () => {
    const tree = toJson(mountedComponent);
    expect(tree).toMatchSnapshot();
  });
  it('should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });
  it('should check Prop matches with initialState', () => {
    const tree = toJson(mountedComponent);
    expect(Object.keys(tree.node.props).length).toBeGreaterThanOrEqual(1);
  });
  it('checks if loading is true', () => {
    props.fetching = true;
    const shallowComponent = shallow(<Home {...props} />);
    expect(shallowComponent.instance().props.fetching).toEqual(true);
  });
  it('checks if books length is less than 1', () => {
    props.books = {};
    const shallowComponent = shallow(<Home {...props} />);
    expect(Object.keys(shallowComponent.instance().props.books).length < 1).toEqual(true);
  });
});