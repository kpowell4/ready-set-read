import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './MyBooks';
import BookCard from './BookCard'; // Import BookCard component
import '../css/MyCart.css';

const MyCart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const [borrowedBooks, setBorrowedBooks] = useState(0);
    const navigate = useNavigate();

    const totalBooks = cart.length;

    const handleCheckout = () => {
        setBorrowedBooks(borrowedBooks + totalBooks);
        navigate('/mybooks');
    };

    return (
        <div className="my-cart-page">
            <header>
                <h1>My Cart</h1>
            </header>

            <main>
                <section className="cart-items">
                    <h2>Items in Cart</h2>
                    <div className="book-list">
                        {cart.length > 0 ? (
                            cart.map((book) => (
                                <div className="book-item" key={book._id}>
                                    <BookCard book={book} /> {/* Display each book as a BookCard */}
                                    <div className="book-actions">
                                        <button onClick={() => removeFromCart(book._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </section>

                <section className="cart-summary">
                    <h2>Summary</h2>
                    <p>Total Books: {totalBooks}</p>
                    <p>Borrowed Books: {borrowedBooks}</p>
                    <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                </section>
            </main>
        </div>
    );
};

export default MyCart;



