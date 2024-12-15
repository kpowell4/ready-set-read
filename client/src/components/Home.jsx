import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCard from './BookCard';
import '../css/Home.css';
import "../css/SearchBar.css";

const Home = () => {
    const scrollRef = useRef(null);
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 200; // Scroll left by 200 pixels
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 200; // Scroll right by 200 pixels
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3002/book/books')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.error('Error fetching books:', err));
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBorrowClick = (bookId) => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        
        if (!token) {
            navigate('/login'); // Redirect to login page if not logged in
        } else {
            // Proceed with borrowing the book
            console.log(`Borrow book with ID: ${bookId}`);
        }
    };

    return (
        <div className="hero">
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
            <main className="main">
                <section className="recently-added">
                    <h2>Recently Added Books</h2>
                    <div className="scroll-container">
                        <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                        <div className="book-list" ref={scrollRef}>
                            {filteredBooks.slice(0, 4).map((book, index) => (
                                <BookCard key={index} book={book} onBorrowClick={handleBorrowClick} />
                            ))}
                        </div>
                        <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
                    </div>
                    <button className="see-all-button" onClick={() => window.location.href = '/books'}>See All Books</button>
                </section>
                <section className="learning-resource">
                    <h2>Learning Resource</h2>
                    <div className="resource-list">
                        <ul className="resource-links">
                            <li><a href="https://www.khanacademy.org/">Khan Academy</a></li>
                            <li><a href="https://www.coursera.org/">Coursera</a></li>
                            <li><a href="https://www.edx.org/">edX</a></li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
