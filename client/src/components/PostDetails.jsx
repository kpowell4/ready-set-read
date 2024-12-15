import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PostDetails.css'; 

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3002/post/${id}`)
            .then(res => {
                console.log('Fetched Post Details:', res.data); // Log the response to verify
                setPost(res.data);
            })
            .catch(err => {
                console.error('Error fetching post details:', err.response || err.message);
                setError('Error fetching post details. Please try again later.');
            });
    }, [id]);

    const handleApprove = () => {
        axios.post(`http://localhost:3002/post/approve/${id}`)
            .then(() => {
                navigate('/dashboard'); // Navigate back to the dashboard after approval
            })
            .catch(err => {
                console.error('Error approving post:', err);
            });
    };

    const handleReject = () => {
        axios.post(`http://localhost:3002/post/reject/${id}`)
            .then(() => {
                navigate('/dashboard'); // Navigate back to the dashboard after rejection
            })
            .catch(err => {
                console.error('Error rejecting post:', err);
            });
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="post-details-container">
            {post ? (
                <div className="post-details">
                    <h2>Post Details</h2>
                    <p><strong>Username:</strong> {post.username}</p>
                    <p><strong>Comment:</strong> {post.comment}</p>
                    <p><strong>Date:</strong> {post.date}</p>
                    <p><strong>Selected Book:</strong> {post.selectedBook}</p>
                    <div className="buttons">
                        <button className="approve-button" onClick={handleApprove}>Approve</button>
                        <button className="reject-button" onClick={handleReject}>Reject</button>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default PostDetails;




