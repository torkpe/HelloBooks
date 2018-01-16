import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import connectedAllNotReturned, { AllNotReturned }  from '../../components/AllNotReturned.jsx';
import render from 'react-test-renderer';
import { Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import storeConfiguration from '../../store/store';

configure({ adapter: new Adapter() });

describe('<AllNotReturned />', () => {
  const props = {
    allNotReturned: jest.fn(),
    clearBooksState: jest.fn(),
    auth: {
      user: {
        id:1
      },
    },
    message: '',
    notReturned: {
      notReturned:{
        books: [{
          title: 'eze goes to school',
          description: 'a boy from the village who finally went to school',
          id: 1,
          cover: 'xcgvhjkhcvbkjhgcvbjhcv'
        }]
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
    shallowComponent = shallow(<AllNotReturned {...props} />);
    wrapper = mount(<Provider store={storeConfiguration()}><connectedAllNotReturned /></Provider>);
  });
  it('renders <AllNotReturned /> component', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  it('calls clearBooksState', () => {
    const shallowComponent = shallow(<AllNotReturned {...props} />);
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent.instance().props.clearBooksState).toHaveBeenCalled();
  });
  it('checks for message', () => {
    props.message = 'xkjhgfgghjgcf'
    const shallowComponent = shallow(<AllNotReturned {...props} />);
    shallowComponent.instance().componentWillUnmount();
    expect(shallowComponent.instance().props.message).toEqual('xkjhgfgghjgcf');
  });
})