import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

class BookMenu extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    
    render() {
        const {  book, onChangeShelf } = this.props;
        return(
            <div className="book-shelf-changer">
                <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
                    <option key="move" value="move" disabled>Move to...</option>
                    <option key="currentlyReading" value="currentlyReading">Currently Reading</option>
                    <option key="wantToRead" value="wantToRead">Want to Read</option>
                    <option key="read" value="read">Read</option>
                    <option key="none" value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookMenu;