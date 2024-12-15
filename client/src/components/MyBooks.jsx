import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        setCart((prevCart) => [...prevCart, book]);
    };

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter(book => book._id !== bookId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
