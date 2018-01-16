import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import { postBook, clearCreatedBookState } from '../actions/books';
import uploader from '../actions/upload';

// Set initial state
const initialState = {
  cover: '',
  pdf: '',
  title: '',
  author: '',
  description: '',
  quantity: '',
  genre: '',
  isLoading: false,
  isCoverAndPdf: false,
  isCoverSet: false,
  isPdfSet: false,
  error: '',
  isPostCover: false,
  isPostPdf: false
};

/**
 * @class UploadBook
 * @classdesc returns UploadBook component
 */
export class UploadBook extends Component {
  /**
   * @param {object} props
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.state = initialState;
    this.coverChange = this.coverChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pdfChange = this.pdfChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPostCover = this.onPostCover.bind(this);
    this.onPostPdf = this.onPostPdf.bind(this);
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const {
      cover, pdf, createBook, error
    } = nextProps;
    if (cover) {
      this.setState({
        cover,
        isPostCover: false
      });
    }
    if (nextProps.pdf) {
      this.setState({
        pdf,
        isPostPdf: false
      });
    }
    if (cover && pdf) {
      this.setState({
        isCoverAndPdf: false
      });
    }
    if (createBook) {
      this.setState({
        isLoading: false,
        isCoverSet: false,
        isPdfSet: false,
      });
      if (Object.keys(createBook).length > 6) {
        this.props.clearCreatedBookState();
        browserHistory.push('/home');
      }
      if (error) {
        this.setState({
          error
        });
      }
    }
  }
  /**
   * @param {object} prevProps
   * @param {object} prevState
   * @return {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      createBook, error, pdf, cover
    } = this.props;
    if (prevProps.createBook !== createBook) {
      toastr.success('Book created');
    }
    if (prevProps.error !== error) {
      toastr.error(error);
    }
    if (prevProps.cover !== cover) {
      toastr.success('Cover Uploaded');
    }
    if (prevProps.pdf !== pdf) {
      toastr.success('Pdf uploaded');
    }
  }
  componentWillUnmount() {
    this.props.clearCreatedBookState();
    this.setState({
      initialState
    });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.postBook(this.state);
  }
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onPostCover(event) {
    event.preventDefault();
    this.props.uploader(this.state.cover, 'cover');
    this.setState({
      isPostCover: true
    });
  }
  onPostPdf(event) {
    event.preventDefault();
    this.props.uploader(this.state.pdf, 'pdf');
    this.setState({
      isPostPdf: true
    });
  }
  coverChange(event) {
    event.preventDefault();
    const cover = event.target.files[0];
    this.setState({
      cover,
      isCoverSet: true,
      isCoverAndPdf: true
    });
  }
  pdfChange(event) {
    event.preventDefault();
    const pdf = event.target.files[0];
    this.setState({
      pdf,
      isPdfSet: true,
      isCoverAndPdf: true
    });
  }
  /**
   * @return {XML} JSX
   */
  render() {
    const mdlButton = `
    mdl-button
    mdl-js-button
    `;
    const { error, isPostCover, isPostPdf } = this.state;
    const mdlStyleButton = `mdl-button mdl-js-button`;
    return (
      <div className="mdl-grid">
        <div className="contents">
          {error && <div className="errors"> {error} </div>}
          {isPostCover ? <div className="contents"> <h5>Uploading Cover...</h5> </div> : ''}
          {isPostPdf ? <div className="contents"> <h5>Uploading Pdf...</h5> </div> : ''}
          <div
          className="card-enlarge card-wrapper mdl-card mdl-shadow--3dp">
            <form ref="bookForm">
              <h5>Book Details</h5>
              <div
                className="card-content input-wrapper">
                <input
                  type="text"
                  className=""
                  onChange={this.onChange}
                  name="title" id="title"
                  placeholder="Title" />
              </div>
              <div
                className="card-content input-wrapper">
                <input
                  type="text"
                  className=""
                  onChange={this.onChange}
                  name="author" id="author"
                  placeholder="Author" />
              </div>
              <div
                className="card-content input-wrapper">
                <input
                  type="text"
                  className=""
                  onChange={this.onChange}
                  name="description" id="description"
                  placeholder="Description" />
              </div>
              <div
              className="card-content input-wrapper">
                <input
                  type="text"
                  className=""
                  onChange={this.onChange}
                  name="genre" id="genre"
                  placeholder="Genre" />
              </div>
              <div
              className="card-content input-wrapper">
                <input
                  type="number"
                  className=""
                  onChange={this.onChange}
                  name="quantity" id="quantity"
                  placeholder="Quantity" />
              </div>
              <div className="card-content upload file-upload">
                <label
                  htmlFor="file-upload"
                  name="cover"
                  className="btn btn-default">
                  Upload cover
                </label>
                <input
                  type="file" accept="image/*"
                  className="mdl-textfield__input"
                  onChange={this.coverChange}
                  name="cover"
                  id="file-upload"
                  required />
                <label
                  htmlFor="file-upload2"
                  name="pdf"
                  className="btn btn-default">
                  Upload Pdf
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  className="mdl-textfield__input"
                  onChange={this.pdfChange}
                  name="pdf" id="file-upload2" />
              </div>
              {this.state.isCoverSet ?
                <button
                disabled={this.state.isPostCover}
                onClick={this.onPostCover}
                className={`${mdlButton}mdl-button--raised
                mdl-button--colored`}
                id="button">
                  Upload Cover
                </button> : ''
              }
              {this.state.isPdfSet ?
                <button
                disabled={this.state.isPostPdf}
                onClick={this.onPostPdf}
                className={`${mdlButton}mdl-button--raised
                mdl-button--colored`}
                id="button">
                  Upload Pdf
                </button> : ''
              }
              <button
                disabled={this.state.isCoverAndPdf}
                onClick={this.onSubmit}
                className={`${mdlButton}mdl-button--raised
                mdl-button--colored`}
                id="button">
                  Create Book
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
UploadBook.propTypes = {
  postBook: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  admin: state.createBook,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  createBook: state.createBook.book,
  message: state.createBook.message,
  error: state.createBook.errors.message
});

export default connect(mapStateToProps, {
  postBook,
  uploader,
  clearCreatedBookState
})(UploadBook);
