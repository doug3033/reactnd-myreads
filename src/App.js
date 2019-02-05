import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  changeShelf = (bookId, shelf) => {
    let book = this.state.books.find((book) => book.id === bookId);
    BooksAPI.update(book, shelf);
    this.setState({
      books: this.state.books.map(book => (book.id === bookId ? Object.assign({}, book, { shelf: shelf }) : book))
    });
  }

  componentDidMount() {
    console.log("GettingAll!");
    BooksAPI.getAll().then((books) => {
        books.forEach((book) => console.log(book.title + " " + book.id + " " + book.shelf));
        this.setState((currentState) => ({
          books: books
        }));
    })
  }

  render() {
    return ( 
      <BrowserRouter>
        <div className="app">
        <Route exact path='/' render={() => (
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
      
          <div>
            <Link className="open-search" to="/search">Add a book</Link>
          </div>
        </div>
        )} />
      <Route path='/search' render={({ history }) => (
        <div>
        <Search booksOnShelf={this.state.books} onChangeShelf={this.changeShelf}></Search>
        </div>
      )} />
      </div>     
    </BrowserRouter>  

    )
  }
}

export default BooksApp
