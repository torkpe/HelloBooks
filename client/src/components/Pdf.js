import React, { Component } from 'react';
import PDF from 'react-pdf-js';
import { connect } from 'react-redux';
import PDFReader from "react-pdf-reader";
import "react-pdf-reader/dist/TextLayerBuilder.css";
import "react-pdf-reader/dist/PdfReader.css";

import { getABook } from '../actions/books';

class MyPdfViewer extends Component {
    componentWillMount(){
        this.props.getABook(this.props.params.key)
        console.log(this.props)
    }
    render() {
        const { book } = this.props     
        return (
        <div>    
            {
                Object.keys(book).length > 0 && <PDFReader
                file={book.pdf}
                renderType="svg"
                /> 
            }
        </div>
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