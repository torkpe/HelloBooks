import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Books from '../../components/Books.jsx';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  const props = {
    getBooks: jest.fn(),
    book: {
      title: 'eze goes to school',
      description: 'a boy from the village who finally went to school',
      id: 1,
      cover: 'xcgvhjkhcvbkjhgcvbjhcv',
      pdf: 'cghjklhgcfhgjkhgjh',
      quantity: 1,
      genre: 'eductaional'
    },
  };
  it('renders <Home /> component', () => {
    const shallowComponent = shallow(<Books {...props} />);
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
});
