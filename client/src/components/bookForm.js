import React, { Component } from 'react';
import propTypes from 'prop-types';
import {  connect } from 'react-redux';
import { getABook } from '../actions/books';

const initialState = {
          cover: '',
          pdf: '',
          title: '',
          author: '',
          description: '',
          quantity: '',
          genre: '',
          isLoading: false,
}
class updateBook extends Component {    
    constructor(props) {
        super(props);
        this.state = initialState
        this.coverChange = this.coverChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.pdfChange = this.pdfChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    coverChange(e) {
        let cover = e.target.files[0];
        this.setState({
            cover
        })
    }
        onChange(e) {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    pdfChange(e) {
        e.preventDefault()
        let pdf = e.target.files[0];
        this.setState({
            pdf
        })
    }
    onSubmit(e) {
        e.preventDefault()
        this.props.postBook(this.state)
        this.refs.bookForm.reset();
        this.setState({
          cover: '',
          pdf: '',
          title: '',
          author: '',
          description: '',
          quantity: '',
          genre: '',
          isLoading: false,
        })
    }
    componentWillMount(){
        this.props.getABook(this.props.params.id)
    }
  render() {
      const { books } = this.props.book
    return (
        <div className='mdl-grid'>
            <div className='contents'>
                {Object.keys(books).length > 0 && <div className="card-enlarge mdl-card mdl-shadow--3dp">
                    <form ref='bookForm' onSubmit={this.onSubmit}>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' className='mdl-textfield__input' onChange={this.onChange}
                                name='title' id='title' required/>
                            <label htmlFor='title' className='mdl-textfield__label'>{books.title}</label>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' className='mdl-textfield__input' onChange={this.onChange}
                                name='author' id='author'required/>
                            <label htmlFor='author' className='mdl-textfield__label'>{books.author}</label>                           
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' className='mdl-textfield__input' onChange={this.onChange}
                                name='description' id='description'required/>
                            <label htmlFor='description' className='mdl-textfield__label'>{books.description}</label>                           
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='text' className='mdl-textfield__input' onChange={this.onChange}
                                name='genre' id='genre'required/>
                            <label htmlFor='genre' className='mdl-textfield__label'>{books.genre}</label>
                        </div>
                        <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label card-content'>
                            <input type='number' className='mdl-textfield__input' onChange={this.onChange}
                                name='quantity' id='text'required/>
                            <label htmlFor='quantity' className='mdl-textfield__label'>{books.quantity}</label>                           
                        </div>
                        <div className='card-content upload file-upload'>
                        <label htmlFor='file-upload' className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent file-upload btn1'>Upload cover</label>
                            <input type='file' accept='image/*' className='mdl-textfield__input' onChange={this.coverChange}
                                name='cover' id="file-upload"required/>
                  
                        <label htmlFor='file-upload2' className='mdl-button mdl-js-button mdl-button--raised mdl-button--accent file-upload btn2'>Upload Pdf</label>
                            <input type='file' className='mdl-textfield__input' onChange={this.pdfChange}
                                name='pdf' id="file-upload2"required/>                      
                 
                        </div>
                        <button disabled = {this.props.admin.isLoading} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="button">
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

const mapStateToProps = (state) => {
    return {
        admin: state.createBook,
        book: state.getABook
    }
}

export default connect(mapStateToProps, { getABook })(updateBook);
