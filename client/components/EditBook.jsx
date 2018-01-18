import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { getABook, editBook } from '../actions/books';
import uploader from '../actions/upload';

/**
 * @classdesc returns component to edit book
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
      isPostPdf: false
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
  componentWillMount() {
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
    const { book, cover, pdf } = nextProps;
    if (book) {
      this.setState({
        cover: book.cover,
        pdf: book.pdf,
        title: book.title,
        author: book.author,
        description: book.description,
        quantity: book.quantity,
        genre: book.genre,
        loading: false,
      });
    }
    if (pdf) {
      this.setState({
        pdf: nextProps.pdf,
        isPdfSet: false,
        isPostPdf: false
      });
      toastr.success('The title', 'Pdf updated');
    }
    if (cover) {
      this.setState({
        cover: nextProps.cover,
        isCoverSet: false,
        isPostCover: false
      });
      toastr.success('The title', 'Cover updated');
    }
    if (cover && pdf) {
      this.setState({
        loading: false,
        isImageAndPdf: false
      });
    }
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
      toastr.success('The title', 'Book updated');
      return browserHistory.push('/home');
    }
    if (prevProps.updatedDetail.error !== error) {
      return toastr.error('The title', error.message);
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
   * @param {object} event
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
   * @return {XML} JSX
   */
  render() {
    const mdlButton = `
    mdl-button
    mdl-js-button
    `;
    const { book } = this.props;
    const { error, isPostCover, isPostPdf } = this.state;
    return (
      <div className="mdl-grid">
        <div className="contents">
          {isPostCover ? <div className="contents"> <h5>Uploading Cover...</h5> </div> : ''}
          {isPostPdf ? <div className="contents"> <h5>Uploading Pdf...</h5> </div> : ''}
          {Object.keys(book).length > 0 ?
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
                    value={this.state.title}
                    placeholder="Title" />
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="text"
                  className=""
                  defaultValue={this.state.author}
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
                  defaultValue={this.state.description}
                  id="description"required />
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="text"
                  className=""
                  defaultValue={this.state.genre}
                  onChange={this.onChange}
                  name="genre" id="genre"required />
                </div>
                <div
                className="card-content input-wrapper">
                  <input
                  type="number"
                  className=""
                  onChange={this.onChange}
                  name="quantity"
                  defaultValue={this.state.quantity}
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
          : ''}
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
});

export default connect(mapStateToProps, { getABook, uploader, editBook })(UpdateBook);
