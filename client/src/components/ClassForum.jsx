import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Dashboard.css";
import { PostContext } from './PostContext'; // Import PostContext

const ClassForum = () => {
    const { posts, setPosts } = useContext(PostContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/posts')
            .then(res => {
                setPosts(res.data);
                console.log('Fetched Posts:', res.data); // Log the response to verify
            })
            .catch(err => {
                if (err.response) {
                    // Server responded with a status code outside the range of 2xx
                    console.error('Error response:', err.response);
                } else if (err.request) {
                    // No response received
                    console.error('Error request:', err.request);
                } else {
                    // Other errors
                    console.error('Error message:', err.message);
                }
            });
    }, [setPosts]); // Dependency array ensures this runs once when the component mounts

    return (
        <div className="dashboard">
            
            <div className="header-box">
                <h1>Class Forum</h1>
                <h2 className='dashboard-text'>Here you can read what other students have to say about particular books they've read.</h2>
                <button className="add-student-button" onClick={() => navigate('/post')}>Add a Post</button>
            </div>
            
        </div>
    );
};

export default ClassForum;
