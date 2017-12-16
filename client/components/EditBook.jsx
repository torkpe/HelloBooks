import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { getABook, editBook } from '../actions/books';
import uploader from '../actions/upload';

/**
 * @class Confirm
 * @classdesc returns component to edit book
 */
class updateBook extends Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isImageAndPdf: false,
      isImageSet: false,
      isPdfSet: false,
    };
    this.coverChange = this.coverChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pdfChange = this.pdfChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPostCover = this.onPostCover.bind(this);
    this.onPostPdf = this.onPostPdf.bind(this);
  }
  /**
   * @return {undefined}
   */
  componentWillMount() {
    this.props.getABook(this.props.params.id);
  }
  /**
   * @param {object} nextProps
   * @return {undefined}
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
        isPdfSet: false
      });
    }
    if (cover) {
      this.setState({
        cover: nextProps.cover,
        isImageSet: false
      });
    }
    if (cover && pdf) {
      this.setState({
        loading: false,
        isImageAndPdf: false
      });
    }
  }
  /**
   * @param {object} prevProps
   * @param {object} prevState
   * @return {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    const { book, error } = this.props.updatedDetail;
    if (prevProps.updatedDetail.book.updatedBook !== book.updatedBook) {
      return toastr.success('The title', 'Book updated');
    }
    if (prevProps.updatedDetail.error !== error) {
      return toastr.error('The title', error.message);
    }
  }
  /**
   * @param {object} event
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
   * @param {object} event
   * @return {undefined}
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onPostCover(event) {
    event.preventDefault();
    this.props.uploader(this.state.cover, 'cover');
    this.setState({
      loading: true
    });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  onPostPdf(event) {
    event.preventDefault();
    this.props.uploader(this.state.pdf, 'pdf');
    this.setState({
      loading: true
    });
  }
  /**
   * @param {object} event
   * @return {undefined}
   */
  coverChange(event) {
    event.preventDefault();
    const cover = event.target.files[0];
    this.setState({
      cover,
      isImageSet: true,
    });
  }
  /**
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
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div
            className="card-enlarge mdl-card mdl-shadow--3dp">
            {Object.keys(book).length > 0 ?
              <form ref="bookForm">
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                    type="text"
                    className="mdl-textfield__input" onChange={this.onChange}
                    name="title"
                    id="title"
                    defaultValue={this.state.title}
                    required />
                  {this.state.title ? '' :
                  <label
                  htmlFor="title"
                  className="mdl-textfield__label">Title
                  </label>}
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input"
                  defaultValue={this.state.author}
                  onChange={this.onChange}
                  name="author" id="author"required />
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="description"
                  defaultValue={this.state.description}
                  id="description"required />
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input"
                  defaultValue={this.state.genre}
                  onChange={this.onChange}
                  name="genre" id="genre"required />
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="number"
                  className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="quantity"
                  defaultValue={this.state.quantity}
                  id="text"required />
                </div>
                <div
                className="card-content upload file-upload">
                  <label
                  htmlFor="file-upload"
                  className={`${mdlButton}file-upload mdl-button--accent btn1`}>
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
                  className={`${mdlButton}file-upload
                  mdl-button--accent btn2`}>
                Upload Pdf
                  </label>
                  <input
                  type="file"
                  accept=".pdf"
                  className="mdl-textfield__input"
                  onChange={this.pdfChange}
                  name="pdf" id="file-upload2" />
                </div>
                {this.state.isImageSet ?
                  <button
                  disabled={this.state.isLoading}
                  onClick={this.onPostCover}
                  className={`${mdlButton}mdl-button--raised
                  mdl-button--colored`}
                  id="button">
                    Upload Cover
                  </button> : ''
                }
                {this.state.isPdfSet ?
                  <button
                  disabled={this.state.isLoading} onClick={this.onPostPdf}
                  className={`${mdlButton}mdl-button--raised
                  mdl-button--colored`}
                  id="button">
                    Upload Pdf
                  </button> : ''
                }
                <button
                disabled={this.state.loading}
                onClick={this.onSubmit}
                className={`${mdlButton}mdl-button--raised
                mdl-button--colored`}
                id="button">
                Update book
                </button>
              </form>
            : ''}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * returns props
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  admin: state.createBook,
  book: state.getABook.book,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  updatedDetail: state.editBook,
});

export default connect(mapStateToProps, { getABook, uploader, editBook })(updateBook);
