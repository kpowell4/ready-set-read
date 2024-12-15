import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isLoggedIn: false, role: '' });
    const navigate = useNavigate();

    const login = (role) => {
        setAuth({ isLoggedIn: true, role });
    };

    const logout = () => {
        axios.post('http://localhost:3002/auth/logout')
            .then(() => {
                setAuth({ isLoggedIn: false, role: '' });
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

