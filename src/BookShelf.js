import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css';


class BookShelf extends Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        booksOnShelf: PropTypes.array.isRequired,
        shelfId: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        books: []
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books ? nextProps.books : [] });  
    }

    filterByShelf(booksOnShelf, shelf) {
        return booksOnShelf ? booksOnShelf.filter((c) => {
            return(c.shelf === shelf);
        }) : [];
    } 

    render() {
        const { shelfName, booksOnShelf, shelfId, onChangeShelf } = this.props;
        let { books } = this.state;
        books = this.filterByShelf(booksOnShelf, shelfId);
        
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                { 
                    books.map((book) => {
                        return(<li key={book.id}>
                        <Book book={book} key={book.title} onChangeShelf={onChangeShelf}></Book>
                        </li>);
                    })
                } 
            </ol>
            </div>
        </div>
        );
    }
}

export default BookShelf