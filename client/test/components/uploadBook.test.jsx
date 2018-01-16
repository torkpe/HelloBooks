import React from 'react';
import toJson from 'enzyme-to-json';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import storeConfiguration from '../../store/store';
import { UploadBook }  from '../../components/UploadBook.jsx';

configure({ adapter: new Adapter() });

describe('<UploadBook />', () => {
  const props = {
    getABook: jest.fn(),
    uploader: jest.fn(),
    postBook: jest.fn(),
    clearCreatedBookState: jest.fn(),
    params: {
      key: 34567
    },
    createBook: {
      book: {
        cover: 'book.cover',
        pdf: 'book.pdf',
        title: 'book.tithjdfkghfdle',
        author: 'book.author',
        description: 'book.ddfjhvbdfhvescription',
        quantity: 'book.quantity',
        genre: 'cghjkljhgn'
      },
      error: {
        message: 'something went wrong'
      }
    },
    pdf: {
      pdf: 'ghjkljhgnh'
    },
    cover: {
      cover: 'ghjkljhgnh'
    },
    book: {
      cover: ['book.cover'],
      pdf: ['book.pdf'],
      title: 'book.title',
      author: 'book.author',
      description: 'book.description',
      quantity: 'book.quantity',
      genre: 'cghjkljhgn'
    }
  };
  let event = {
    preventDefault: jest.fn(),
    target: {
      cover: ['book.cover'],
      pdf: ['book.pdf'],
      title: 'book.title',
      author: 'book.author',
      description: 'book.description',
      quantity: 'book.quantity',
      genre: 'book.genre',
      files: ['book.cover'],
    }
  };
  const mockStore = configureMockStore();
  let shallowComponent;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(storeConfiguration());
    shallowComponent = shallow(<UploadBook {...props} />);
  });
  it('renders <UploadBook /> component', () => {
    const tree = toJson(shallowComponent);
    expect(tree).toMatchSnapshot();
  });
  it('calls handle onChange event', () => {
    sinon.spy(UploadBook.prototype, 'onChange');
    shallowComponent.instance().onChange(event);
    expect(UploadBook.prototype.onChange.calledOnce).toEqual(false);
  });
  it('calls handle coverChange event', () => {
    sinon.spy(UploadBook.prototype, 'coverChange');
    shallowComponent.instance().coverChange(event);
    expect(UploadBook.prototype.onChange.calledOnce).toEqual(false);
  });
  it('calls handle coverChange event', () => {
    sinon.spy(UploadBook.prototype, 'pdfChange');
    shallowComponent.instance().pdfChange(event);
    expect(UploadBook.prototype.onChange.calledOnce).toEqual(false);
  });
  it('calls submit event', () => {
    sinon.spy(UploadBook.prototype, 'onSubmit');
    event = {
      preventDefault: jest.fn(),
    };
    shallowComponent.instance().onSubmit(event);
    expect(shallowComponent.instance().state.isLoading).toEqual(false);
  });
  it('calls post cover event', () => {
    sinon.spy(UploadBook.prototype, 'onPostCover');
    event = {
      preventDefault: jest.fn(),
    };
    shallowComponent.instance().onPostCover(event);
    expect(shallowComponent.instance().state.isLoading).toEqual(false);
    expect(shallowComponent.instance().state.isPostCover).toEqual(true);
  });
  it('calls post pdf event', () => {
    sinon.spy(UploadBook.prototype, 'onPostPdf');
    event = {
      preventDefault: jest.fn(),
    };
    shallowComponent.instance().onPostPdf(event);
    expect(shallowComponent.instance().state.isLoading).toEqual(false);
    expect(shallowComponent.instance().state.isPostPdf).toEqual(true);
  });
  it('calls componentWillReceiveProps ', () => {
    shallowComponent = shallow(<UploadBook {...props} />);
    shallowComponent.instance().componentWillReceiveProps(props);
    expect(shallowComponent.instance().props).toEqual(props);
    expect(shallowComponent.instance().state.isPdfSet).toEqual(false);
    expect(shallowComponent.instance().state.isCoverSet).toEqual(false);
    expect(shallowComponent.instance().state.isCoverSet).toEqual(false);
    expect(shallowComponent.instance().state.isPostCover).toEqual(false);
    expect(shallowComponent.instance().state.isPostPdf).toEqual(false);
    expect(shallowComponent.instance().state.isLoading).toEqual(false);
  });
  it('calls componentWillReceiveProps ', () => {
    shallowComponent = shallow(<UploadBook {...props} />);
    shallowComponent.instance().componentWillUnmount(props);
    expect(shallowComponent.instance().props.clearCreatedBookState).toHaveBeenCalled();
  });
});
