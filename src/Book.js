import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookMenu from './BookMenu'
import './App.css';

class Book extends Component {
    static propTypes = {
       /* title: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        authors: PropTypes.array.isRequired,
        bookId: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired, */
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { book, onChangeShelf } = this.props;
   //     console.log("in Book " + book.title + " " +  book.cover);
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{  width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <BookMenu book={book} onChangeShelf={onChangeShelf}></BookMenu>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    book.authors.map((author) => {
                        return(
                            <div key={author} className="book-authors">{author}</div>
                        );                        
                    })
                }
            </div>
        );
    }

}

export default Book