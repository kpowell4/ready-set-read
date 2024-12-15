import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './MyBooks';
import '../css/BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3002/book/books/${id}`)
            .then(res => {
                setBook(res.data);
            })
            .catch(err => {
                console.error(err);
                setError('Error fetching book details. Please try again later.');
            });
    }, [id]);

    const handleBorrowClick = () => {
        addToCart(book);
        navigate('/mybooks');
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="book-detail-container">
            {book ? (
                <div className="book-detail">
                    <div className="book-info">
                        <img src={book.imageUrl || 'placeholder.jpg'} alt={book.title} className="book-image" />
                        <div className="book-details">
                            <h2>{book.title}</h2>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Category:</strong> {book.category}</p>
                            <p><strong>Grade Level:</strong> {book.level}</p>
                            <p><strong>Description:</strong> {book.description}</p>
                        </div>
                    </div>
                    <div className="borrow-button-container">
                        <button className="borrow-button" onClick={handleBorrowClick}>Borrow</button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            
        </div>
    );
};

export default BookDetail;


