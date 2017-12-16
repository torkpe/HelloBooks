import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import { connect } from 'react-redux';
import PDFReader from "react-pdf-reader";
import "react-pdf-reader/dist/TextLayerBuilder.css";
import "react-pdf-reader/dist/PdfReader.css";

import { getABook } from '../actions/books';

/**
 * @class Notifications
 * @classdesc returns Notificarions component
 */
class MyPdfViewer extends Component {
  /**
   * @return {undefined}
   */
  componentWillMount() {
    this.props.getABook(this.props.params.key);
  }
  /**
   * @return {XML} JSX
   */
  render() {
    const { book } = this.props;
    return (
      <div>
        {
          Object.keys(book).length > 0 && <PDFReader
            file={book.pdf}
            renderType="svg"
          />
        }
      </div>
    );
  }
}
/**
 * @param {object} state
 * @return {object} props
 */
const mapStateToProps = state => ({
  book: state.getABook.book,
  userId: state.auth.user.user,
});

export default connect(mapStateToProps, { getABook })(MyPdfViewer);