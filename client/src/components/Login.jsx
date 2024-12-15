import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";
import axios from 'axios';

const Login = ({ setRole }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('student'); // Default role is student
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login request payload:', { username, password, role: selectedRole }); // Log the request payload

        axios.post('http://localhost:3002/auth/login', { username, password, role: selectedRole })
            .then(res => {
                console.log('Login response:', res.data); // Log the response for debugging
                if (res.data.login && res.data.role === 'admin') {
                    setRole('admin');
                    navigate('/dashboard');
                } else if (res.data.login && res.data.role === 'students') {
                    setRole('student');
                    navigate('/');
                } else {
                    setError('Login failed. Please check your credentials and try again.');
                }
            })
            .catch(err => {
                setError('An error occurred during login. Please try again later.');
                console.error('Login error:', err); // Log the error for debugging
            });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <br />
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter Student ID"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            name="role"
                            id="role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <button className="btn-login" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;




