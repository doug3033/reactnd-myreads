import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  changeShelf = (bookId, shelf) => {
    console.log('changing shelf: ' + bookId  + ' to shelf: ' + shelf);
    this.setState({
      books: this.state.books.map(book => (book.id === bookId ? Object.assign({}, book, { shelf: shelf }) : book))
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState((currentState) => ({
          books: books,
          currentlyReading: [books[1]]
        }));
    })
  }

  
  
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div><Search booksOnShelf={this.state.books} onChangeShelf={this.changeShelf}></Search></div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfName="Currently Reading" shelfId="currentlyReading" booksOnShelf={this.state.books} onChangeShelf={this.changeShelf}></BookShelf>
                <BookShelf shelfName="Want to Read" shelfId="wantToRead" booksOnShelf={this.state.books} onChangeShelf={this.changeShelf}></BookShelf>
                <BookShelf shelfName="Read" shelfId="read" booksOnShelf={this.state.books} onChangeShelf={this.changeShelf}></BookShelf>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
