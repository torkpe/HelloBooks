import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import {  connect } from 'react-redux';
import PDFReader from "react-pdf-reader";
import "react-pdf-reader/dist/TextLayerBuilder.css";
import "react-pdf-reader/dist/PdfReader.css";


import { getABook } from '../actions/books';

class MyPdfViewer extends Component {
    componentWillmount(){
        // this.props.getABook(this.props.params.key)
    }
    render() {
        return (
            
    <PDFReader
        file={this.props.book.pdf}
        renderType="svg"
    />
        )
}
}
const mapStateToProps = (state) => {
    return {
        book: state.getABook.books,
        userId: state.auth.user.user
    }
}

export default connect(mapStateToProps, { getABook })(MyPdfViewer);