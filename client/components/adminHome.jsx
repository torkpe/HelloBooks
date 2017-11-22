import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { postBook } from '../actions/books';
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
  isImageAndPdf: false,
  isImageSet: false,
  isPdfSet: false,
  error: ''
};

class Admin extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.cover) {
      this.setState({
        cover: nextProps.cover,
      });
    }
    if (nextProps.pdf) {
      this.setState({
        pdf: nextProps.pdf,
      });
    }
    if (nextProps.cover && nextProps.pdf) {
      this.setState({
        isImageAndPdf: false
      });
    }
    if (nextProps.createBook) {
      this.setState({
        isLoading: false,
        isImageSet: false,
        isPdfSet: false,
      });
    }
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
  }
  onPostPdf(event) {
    event.preventDefault();
    this.props.uploader(this.state.pdf, 'pdf');
  }
  coverChange(event) {
    event.preventDefault();
    const cover = event.target.files[0];
    this.setState({
      cover,
      isImageSet: true,
      isImageAndPdf: true
    });
  }
  pdfChange(event) {
    event.preventDefault();
    const pdf = event.target.files[0];
    this.setState({
      pdf,
      isPdfSet: true,
      isImageAndPdf: true
    });
  }
  render() {
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div className="card-enlarge mdl-card mdl-shadow--3dp">
            <form ref="bookForm">
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" className="mdl-textfield__input" onChange={this.onChange}
                  name="title" id="title" />
                <label htmlFor="title" className="mdl-textfield__label">Title</label>
              </div>
              <div
                className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" className="mdl-textfield__input" onChange={this.onChange}
                  name="author" id="author" />
                <label htmlFor="author" className="mdl-textfield__label">Author</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" className="mdl-textfield__input" onChange={this.onChange}
                  name="description" id="description" />
                <label htmlFor="description" className="mdl-textfield__label">Description</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="text" className="mdl-textfield__input" onChange={this.onChange}
                  name="genre" id="genre" />
                <label htmlFor="genre" className="mdl-textfield__label">Genre</label>
              </div>
              <div className="mdl-textfield mdl-js-textfield card-content">
                <input
                  type="number" className="mdl-textfield__input" onChange={this.onChange}
                  name="quantity" id="text" />
                <label htmlFor="quantity" className="mdl-textfield__label">Quantity</label>
              </div>
              <div className="card-content upload file-upload">
                <label
                  htmlFor="file-upload"
                  className="mdl-button mdl-js-button mdl-button--accent file-upload btn1">
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
                  className="mdl-button mdl-js-button mdl-button--accent file-upload btn2">
                  Upload Pdf
                </label>
                <input
                  type="file" className="mdl-textfield__input" onChange={this.pdfChange}
                  name="pdf" id="file-upload2" />
              </div>
              {this.state.isImageSet ?
                <button
                disabled={this.state.isLoading} onClick={this.onPostCover}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="button">
                  Upload Cover
                </button> : ''
              }
              {this.state.isPdfSet ?
                <button
                disabled={this.state.isLoading} onClick={this.onPostPdf}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="button">
                  Upload Pdf
                </button> : ''
              }
              <button
                disabled={this.state.isImageAndPdf} onClick={this.onSubmit}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
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
Admin.propTypes = {
  postBook: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
  admin: state.createBook,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  createBook: state.createBook.resp,
});

export default connect(mapStateToProps, { postBook, uploader })(Admin);
