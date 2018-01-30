import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import {
  getABook, editBook,
  getAllGenre
} from '../actions/books';
import uploader from '../actions/upload';

/**
 * @classdesc Returns component to edit book
 */
export class UpdateBook extends Component {
  /**
   * @description Created an instance of UpdateBook
   * 
   * @param {object} props
   * 
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isImageAndPdf: false,
      isCoverSet: false,
      isPdfSet: false,
      isPostCover: false,
      isPostPdf: false,
      isStateSet: false,
      fetching: true
    };
    this.coverChange = this.coverChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pdfChange = this.pdfChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPostCover = this.onPostCover.bind(this);
    this.onPostPdf = this.onPostPdf.bind(this);
  }
  /**
   * @description React life cycle
   * 
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getABook(this.props.params.id);
  }
  /**
   * @description React life cycle
   * 
   * @param {object} nextProps
   * 
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const {
      book,
      cover,
      pdf,
      genre
    } = nextProps;
    if (book && !this.state.isStateSet) {
      this.setState({
        cover: book.cover,
        pdf: book.pdf,
        title: book.title,
        author: book.author,
        description: book.description,
        quantity: book.quantity,
        genre: book.genre,
        loading: false,
        isStateSet: true,
        fetching: false
      });
    }
    if (pdf && this.state.isPostPdf) {
      this.setState({
        pdf: nextProps.pdf,
        isPdfSet: false,
        isPostPdf: false,
        loading: false
      });
      toastr.success('Pdf updated');
    }
    if (cover && this.state.isPostCover) {
      this.setState({
        cover: nextProps.cover,
        isCoverSet: false,
        isPostCover: false,
        loading: false
      });
      toastr.success('Cover updated');
    }
    if (cover && pdf) {
      this.setState({
        loading: false,
        isImageAndPdf: false
      });
    }
    // if (genre && genre.length > 0) {
    //   this.setState({
    //     allGenre: genre
    //   });
    // }
  }
  /**
   * @description React life cycle
   * 
   * @param {object} prevProps
   * 
   * @param {object} prevState
   * 
   * @return {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    const { book, error } = this.props.updatedDetail;
    if (prevProps.updatedDetail.book.updatedBook !== book.updatedBook) {
      toastr.success('Book updated');
      return browserHistory.push('/home');
    }
    if (prevProps.updatedDetail.error !== error) {
      return toastr.error(error.message);
    }
  }
  /**
   * @description Handle form submission
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.editBook(this.state, this.props.params.id);
    this.setState({
      loading: false
    });
  }
  /**
   * @description Read input from form
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @description Handle posting of cover
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onPostCover(event) {
    event.preventDefault();
    this.props.uploader(this.state.cover, 'cover');
    this.setState({
      loading: true,
      isPostCover: true
    });
  }
  /**
   * @description Handle posting of cover
   * 
   * @param {object} event
   * 
   * @return {undefined}
   */
  onPostPdf(event) {
    event.preventDefault();
    this.props.uploader(this.state.pdf, 'pdf');
    this.setState({
      loading: true,
      isPostPdf: true
    });
  }
  /**
   * @description Handle file selection for cover
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
    });
  }
  /**
   * @description Handle file selection for pdf
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
    });
  }
  /**
   * @description Renders UpdateBook component
   * 
   * @return {XML} JSX
   */
  render() {
    const mdlButton = `
    mdl-button
    mdl-js-button
    `;
    const { book, genre } = this.props;
    const {
      error,
      isPostCover,
      isPostPdf,
      fetching
    } = this.state;
    return (
      <div className="mdl-grid">
        <div className="contents">
          {
            isPostCover ?
            <div className="contents">
              <h5>Uploading Cover...</h5>
            </div>
            : ''
          }
          {
            isPostPdf ?
            <div className="contents">
              <h5>Uploading Pdf...</h5>
            </div>
            : ''
          }
          {
            fetching ?
            <div className="contents">
              <h5>Fetching...</h5>
            </div>
            : ''
          }
          {
          this.state.pdf &&
          this.state.cover && genre &&
            <div
              className="card-enlarge card-wrapper mdl-card mdl-shadow--3dp">
              <form>
                <h5>Book Details</h5>
                <div
                  className="card-content input-wrapper">
                  <input
                    type="text"
                    className=""
                    onChange={this.onChange}
                    name="title" id="title"
                    defaultValue={book.title}
                    placeholder="Title" />
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="text"
                  className=""
                  defaultValue={book.author}
                  onChange={this.onChange}
                  name="author" id="author"required />
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="text"
                  className=""
                  onChange={this.onChange}
                  name="description"
                  defaultValue={book.description}
                  id="description"required />
                </div>
                <div
                className="card-content input-wrapper">
                  <select
                  name="genre"
                  onChange={this.onChange}>
                    <option
                    className="default"
                    value="..."
                    >
                      {book.genre}
                    </option>
                    {
                      genre.map((aGenre, index) =>
                     (<option
                        key={index}
                        defaultValue={aGenre}
                        >
                        {aGenre}
                      </option>
                     ))
                    }
                  </select>
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="number"
                  className=""
                  onChange={this.onChange}
                  name="quantity"
                  defaultValue={book.quantity}
                  id="text"required />
                </div>
                <div
                className="card-content upload file-upload">
                  <label
                  htmlFor="file-upload"
                  name="cover"
                  className="btn btn-default">
                  Upload cover
                  </label>
                  <input
                  type="file"
                  accept="image/*"
                  className="mdl-textfield__input"
                  onChange={this.coverChange}
                  name="cover" id="file-upload" />
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
                    disabled={this.state.isPostPdf} onClick={this.onPostPdf}
                    className={`${mdlButton}mdl-button--raised
                    mdl-button--colored`}
                    id="button">
                    Upload Pdf
                  </button> : ''
                }
                <button
                  disabled={this.state.loading}
                  onClick={this.onSubmit}
                  name="updateBook"
                  className={`${mdlButton}mdl-button--raised
                  mdl-button--colored`}
                  id="button">
                  Update book
                </button>
              </form>
            </div>
          }
        </div>
      </div>
    );
  }
}

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
  book: state.getABook.book,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  updatedDetail: state.editBook,
  genre: state.getAllGenre.response.genre,
});

export default connect(mapStateToProps, {
  getABook,
  uploader,
  editBook,
  getAllGenre
})(UpdateBook);
