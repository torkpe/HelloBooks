import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import Select from 'react-select-plus';

import {
  postBook, clearCreatedBookState,
  addBookGenre, getAllGenre,
  clearAddGenreState
} from '../actions/books';
import uploader, { clearUploadState } from '../actions/upload';

// Set initial state
const initialState = {
  cover: '',
  pdf: '',
  title: '',
  author: '',
  description: '',
  quantity: '',
  allGenre: [],
  bookGenre: '',
  isLoading: false,
  isCoverAndPdf: false,
  isCoverSet: false,
  isPdfSet: false,
  error: '',
  genre: '',
  isPostCover: false,
  isPostPdf: false
};

/**
 * @classdesc Returns UploadBook component
 */
export class UploadBook extends Component {
  /**
   * @description Created an instance of Settings
   * 
   * @param {object} props
   * 
   * @returns {undefined}
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
    this.onHandleAddGenre = this.onHandleAddGenre.bind(this);
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   */
  componentDidMount() {
    this.props.getAllGenre();
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @return {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const {
      cover, pdf,
      createBook, error,
      genre, addedGenre,
      addGenreFailed
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
      if (genre.length > 0) {
        this.setState({
          allGenre: genre
        });
      }
      const { message, createdGenre } = addedGenre;
      if (createdGenre) {
        if (!this.state.genre.includes(createdGenre)) {
          this.state.allGenre.push(createdGenre);
          toastr.success(message);
          this.props.clearAddGenreState();
        }
      }
      if (addGenreFailed) {
        toastr.error(addGenreFailed);
        this.props.clearAddGenreState();
      }
    }
  }
  /**
   * @description React life cycle
   * 
   * @param {object} prevProps
   * @param {object} prevState
   * 
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
  /**
   * @description React life cycle
   * 
   * @return {undefined}
   */
  componentWillUnmount() {
    this.props.clearCreatedBookState();
    this.props.clearUploadState();
  }
  /**
   * @description Handles form submission
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.postBook(this.state);
  }
  /**
   * @description Reads form input
   * 
   * @param {object} event
   * 
   * @returns {undefined}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @description Handles cover posting
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onPostCover(event) {
    event.preventDefault();
    this.props.uploader(this.state.cover, 'cover');
    this.setState({
      isPostCover: true
    });
  }
  /**
   * @description Handles pdf posting
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onPostPdf(event) {
    event.preventDefault();
    this.props.uploader(this.state.pdf, 'pdf');
    this.setState({
      isPostPdf: true
    });
  }
  /**
   * @description Reads cover file input
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  coverChange(event) {
    event.preventDefault();
    const cover = event.target.files[0];
    this.setState({
      cover,
      isCoverSet: true,
      isCoverAndPdf: true
    });
  }
  /**
   * @description Reads cover file input
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
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
   * @description Handles new genre createion
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onHandleAddGenre(event) {
    event.preventDefault();
    this.props.addBookGenre(this.state);
    event.target.reset();
  }
  /**
   * @description Renders UploadBook component
   * 
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
          <span className="star">Add new genre</span>
          <form onSubmit={this.onHandleAddGenre}>
            <div
              className="category card-content input-wrapper">
              <input
              type="text"
              onChange={this.onChange}
              name="bookGenre" id="bookGenre"
              placeholder="Genre"
              />
              <button
                name="return"
                className="btn btn-default">
                  Add Genre
              </button>
            </div>
          </form>
          {error && <div className="errors"> {error} </div>}
          {isPostCover ? <div className="contents"> <h5>Uploading Cover...</h5> </div> : ''}
          {isPostPdf ? <div className="contents"> <h5>Uploading Pdf...</h5> </div> : ''}
          <div
          className="card-enlarge card-wrapper mdl-card mdl-shadow--3dp">
            <form ref="bookForm">
              <h5>Upload Book</h5>
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
                <select
                name="genre"
                onChange={this.onChange}
                >
                  <option
                  className="default"
                  value="..."
                  >
                    Select Genre
                  </option>
                  {this.state.allGenre && this.state.allGenre.map((aGenre, index) =>
                    <option key={index} value={aGenre}>{aGenre}</option>)}
                </select>
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
/**
 * @description Get state from store
 *
 * @param {object} state - redux store state
 * @param {object} props - component props
 *
 * @returns {object} map state to props
 */
const mapStateToProps = state => ({
  admin: state.createBook,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  createBook: state.createBook.book,
  message: state.createBook.message,
  error: state.createBook.errors.message,
  genre: state.getAllGenre.response.genre,
  addedGenre: state.addGenre.response,
  addGenreFailed: state.addGenre.errors.message
});

export default connect(mapStateToProps, {
  postBook,
  uploader,
  getAllGenre,
  clearCreatedBookState,
  addBookGenre,
  clearAddGenreState,
  clearUploadState
})(UploadBook);
