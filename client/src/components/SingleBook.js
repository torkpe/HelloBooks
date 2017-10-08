import React, { Component } from 'react';
import {  connect } from 'react-redux';

import { getABook, borrowBook, returnBook } from '../actions/books';

class Book extends Component {
  componentWillMount(){
    this.props.getABook(this.props.params.id)   
  }
  render() {
    const { fetching, books } = this.props.book
    const userId = this.props.userId
    const borrow=(e)=>{
    this.props.borrowBook(userId, books.id)
    }
    const returnBorrowed=(e)=>{
    
    this.props.returnBook(userId, books.id)
    }
    return (
        <div className='mdl-grid'>                                               
            <div className='contents'>
                <div className="demo-card-square mdl-card mdl-shadow--2dp contents">
                <img src={books.cover} alt={books.title}/>
                <div className="mdl-card__supporting-text">
                    Title: {books.title}
                    <br/>
                    Author: {books.author}
                    <br/>
                    Description: {books.description}
                    <br/>
                    Quantity: {books.quantity}
                    <br/>
                    Genre: {books.genre}
                </div>        
                <div className="mdl-card__actions mdl-card--border">
                    {/* Display for users only */}
                    {this.props.auth.user.category ?'':
                    <a onClick={borrow} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Borrow
                    </a>
                    }
                    {this.props.auth.user.category ?'':
                    <a onClick={returnBorrowed} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Return
                    </a>
                    }
                    {/* Display for admins only */}
                    {this.props.auth.user.category ?
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Edit
                    </a>
                    :''
                    }
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Read online
                    </a>
                    {this.props.auth.user.category ?
                    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Delete
                    </a>
                    :
                    ''
                    }
                </div>
                </div>
            </div>
        </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        book: state.getABook,
        userId: state.auth.user.user
    }
}

export default connect(mapStateToProps, { getABook, borrowBook, returnBook })(Book);
