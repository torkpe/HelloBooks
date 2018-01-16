import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import connectedAllBorrowed, { AllBorrowed }  from '../../components/AllBorrowed.jsx';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<AllBorrowed />', () => {
  const props = {
    getAllBorrowed: jest.fn(),
    clearBooksState: jest.fn(),
    auth: {
      user: {
        id:1
      },
    },
    getAllBorrowedBooks: {
      borrowedBooks:{
        books: [
          {
          title: 'eze goes to school',
          description: 'a boy from the village who finally went to school',
          id: 1,
          cover: 'xcgvhjkhcvbkjhgcvbjhcv',
          pdf: 'fghjkhgfghjgfgg',
          quantity: 4,
          genre: 'ghjgv'
        },
        {
          title: 'eze goes to school',
          description: 'a boy from the village who finally went to school',
          id: 1,
          cover: 'xcgvhjkhcvbkjhgcvbjhcv',
          pdf: 'fghjkhgfghjgfgg',
          quantity: 4,
          genre: 'ghjgv'
        }
      ]
      }
    },
    loading: false,
  };
  const mockStore = configureMockStore();
  let shallowComponent;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    shallowComponent = shallow(<AllBorrowed {...props} />);
  });
  it('renders <AllBorrowed /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls clearBooksState', () => {
    const shallowComponent = shallow(<AllBorrowed {...props} />);
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent.instance().props.clearBooksState).toHaveBeenCalled();
  });
  it('checks if loading is true', () => {
    props.loading = true;
    const shallowComponent = shallow(<AllBorrowed {...props} />);
    expect(shallowComponent.instance().props.loading).toEqual(true);
  });
})