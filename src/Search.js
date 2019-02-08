import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends Component {
    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        query: "",
        showingBooks: []
    }

    SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 
            'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 
            'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 
            'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 
            'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 
            'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 
            'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 
            'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 
            'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 
            'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 
            'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 
            'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

    refresh = (query) => {
        BooksAPI.search(query).then((books) => {
                if (books.error) {
                    this.setState((currentState) => {
                        return ({showingBooks: [], query: query})})
                    return;
                }
                this.setState((currentState) => {
                    let myBooks = books ? books : [];
                    // set the default shelf and handle undefined authors.
                    myBooks.forEach((book) => { 
                        let bookOnShelf = this.props.books.find((bookOnShelf) => bookOnShelf.id === book.id);
                        if (bookOnShelf) {
                            book.shelf = bookOnShelf.shelf; 
                        }      
                        if (!book.shelf) {
                            book.shelf = 'none';
                        }
                        if (!book.authors) {
                            book.authors = [];
                        }
                    })
                    // filter out books with no covers.
                    myBooks = myBooks.filter((book) => book.imageLinks);
                    return {showingBooks: myBooks, query: query}
                }
            )})
    }

    updateQuery = (query) => {
        if (query === "") {
            this.setState((currentState) => { 
                return ({showingBooks: [], query: query})})
        } else { 
            // look for search terms          
            const queryTermFilter = this.SEARCH_TERMS.filter(
                term=>term.toLowerCase().includes(query.trim()));
            if (query.length > 0 && queryTermFilter.length !== 0) {
                this.refresh(query);
            }  
        }
    }
    

    onChangeSearch = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
          this.refresh(this.state.query)
        });
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    render() {
        const { query } = this.state
        const { onChangeShelf } = this.props

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    this.state.showingBooks.map((book) => (
                        <li key={book.id}>
                        {book.shelf}
                        <Book book={book} key={book.title} onChangeShelf={onChangeShelf}></Book>
                        </li>
                    ))
                }
              </ol>
            </div>
          </div>
        )

    }

}

export default Search