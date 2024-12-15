import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import BookCard from './BookCard';
import '../css/MyBooks.css';

const MyBooks = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="my-books">
            <h2>My Books</h2>
            <div className="book-list">
                {cart.length > 0 ? (
                    cart.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))
                ) : (
                    <p>No books in your cart.</p>
                )}
            </div>
        </div>
    );
};

export default MyBooks;

