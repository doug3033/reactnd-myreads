import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends Component {
    static propTypes = {
        booksOnShelf: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: ""
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
    }

    clearQuery = () => {
        this.updateQuery('');
    }

    render() {
        const { query } = this.state
        const { booksOnShelf, onChangeShelf } = this.props

        const showingBooks = query === ''
            ? []
            : booksOnShelf.filter((c) => (
                c.title.toLowerCase().includes(query.toLowerCase()) || 
                    c.authors.some((author) => (author.toLowerCase().includes(query.toLowerCase())))
            ))

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
                    showingBooks.map((book) => (
                        <li key={book.id}>
                        <Book key={book.title} shelf={book.shelf} bookId={book.id} title={book.title} authors={book.authors} cover={book.imageLinks.thumbnail} onChangeShelf={onChangeShelf}></Book>
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