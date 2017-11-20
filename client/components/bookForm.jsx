import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getABook, editBook } from '../actions/books';
import uploader from '../actions/upload';

let checker = true;
class updateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.coverChange = this.coverChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.pdfChange = this.pdfChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getABook(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.book && checker) {
      const { book } = nextProps;
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
    if (nextProps.pdf) {
      this.setState({
        pdf: nextProps.pdf,
        loading: false,
      });
    }
    if (nextProps.cover) {
      this.setState({
        cover: nextProps.cover,
        loading: false,
      });
    }
  }
  coverChange(e) {
    checker = false;
    const cover = e.target.files[0];
    this.props.uploader(cover, 'cover');
  }
  onChange(e) {
    checker = false;
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  pdfChange(e) {
    checker = false;
    e.preventDefault();
    const pdf = e.target.files[0];
    this.props.uploader(pdf, 'pdf');
    this.setState({
      loading: true,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.editBook(this.state, this.props.params.id);
  }
  render() {
    const { book } = this.props;
    return (
      <div className="mdl-grid">
        <div className="contents">
          <div
            className="card-enlarge mdl-card mdl-shadow--3dp">
            {Object.keys(book).length > 0 ?
              <form ref="bookForm" onSubmit={this.onSubmit}>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input" onChange={this.onChange}
                  name="title" id="title" defaultValue={this.state.title} required />
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input" defaultValue={this.state.author}
                  onChange={this.onChange}
                  name="author" id="author"required />
                </div>
                <div
                className="mdl-textfield mdl-js-textfield  card-content">
                  <input
                  type="text"
                  className="mdl-textfield__input"
                  onChange={this.onChange}
                  name="description" defaultValue={this.state.description}
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
                  name="quantity" defaultValue={this.state.quantity} id="text"required />
                </div>
                <div
                className="card-content upload file-upload">
                  <label
                  htmlFor="file-upload"
                  className="mdl-button mdl-js-button mdl-button--raised file-upload btn1">
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
                  className="mdl-button mdl-js-button mdl-button--raised file-upload btn2">
                Upload Pdf
                  </label>
                  <input
                  type="file"
                  className="mdl-textfield__input"
                  onChange={this.pdfChange}
                  name="pdf" id="file-upload2" />
                </div>
                <button
                disabled={this.props.updatedDetail.isLoading}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
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

const mapStateToProps = state => ({
  admin: state.createBook,
  book: state.getABook.book,
  cover: state.uploadCover.uploaded,
  pdf: state.uploadPdf.uploaded,
  updatedDetail: state.editBook,
});

export default connect(mapStateToProps, { getABook, uploader, editBook })(updateBook);