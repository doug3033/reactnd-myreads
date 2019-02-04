import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

class BookMenu extends Component {
    static propTypes = {
        bookId: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        shelfName: ''
    }
    
    render() {
        const { bookId, shelf, onChangeShelf } = this.props;
        let { shelfName } = this.state;
        shelfName = shelf;
        return(
            <div className="book-shelf-changer">
                <select value={shelfName} onChange={(event) => onChangeShelf(bookId, event.target.value)}>
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