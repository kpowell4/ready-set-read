import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import heading from '../images/heading.png';
import axios from 'axios';

const Navbar = ({ role, setRole }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://localhost:3002/auth/logout')
            .then(res => {
                if (res.data.logout) {
                    setRole('');
                    navigate('/');
                } else {
                    console.log('Logout failed:', res.data.message);
                }
            })
            .catch(err => console.error('Error during logout:', err));
    };

    return (
        <nav className='navbar'>
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    <img src={heading} alt="Book Store Logo" className="navbar-logo" />
                </Link>
            </div>

            <div className="navbar-center">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/books" className="navbar-link">Books</Link>
                <Link to="/about" className="navbar-link">About Us</Link>
                <Link to="/help" className="navbar-link">Help</Link>
                {role === "admin" && <>
                    
                    <Link to="/addstudent" className="navbar-link">Add Student</Link>
                    <Link to="/addbook" className="navbar-link">Add Book</Link>
                    <Link to="/forum" className="navbar-link">Forum</Link>
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                    
                    
                </>}

                {role === "student" && <>
                    <Link to="/mybooks" className="navbar-link">My Books</Link>
                    <Link to="/post" className="navbar-link">New Post</Link>
                    <Link to="/classforum" className="navbar-link">Class Forum</Link>
                    <Link to="/mycart" className="navbar-link">Cart</Link>
                </>}
            </div>

            <div className="navbar-right">
                {role === "" ?
                    <Link to="/login" className="navbar-link">Login</Link>
                    : <button onClick={handleLogout} className="navbar-link btn-logout">Logout</button>
                }
            </div>
        </nav>
    );
};

export default Navbar;



