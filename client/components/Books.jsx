import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * @description Component for a book
 * 
 * @param {object} props
 * 
 * @return {XML} JSX
 */
const Books = (props) => {
  const { book } = props;
  const mdlStyle = `
    mdl-button
    mdl-button--colored
    mdl-js-button
    mdl-js-ripple-effect
  `;
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="demo-card-square mdl-card mdl-shadow--2dp contents">
        <div className="mdl-card__title mdl-card--expand">
          <h2 className="mdl-card__title-text">{book.title}</h2>
        </div>
        <img src={book.cover} alt="Book cover" />
        <div className="mdl-card__actions mdl-card--border">
          <Link to={`single/${book.id}`} className={mdlStyle}>
              View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Books;
