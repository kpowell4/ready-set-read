import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "../css/Book.css";
import "../css/SearchBar.css";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3002/book/books')
            .then(res => {
                console.log(res.data); // Log the response to verify
                setBooks(res.data); // Set books directly from the response
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="books-container">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search Title, Author, Grade Level" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type='submit'>
                    <i className="fas fa-search"></i>Search
                </button>
            </div>
            <div className="book-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
};

export default Books;
