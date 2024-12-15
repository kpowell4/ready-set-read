import React, { useState, useEffect, useContext } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostContext } from './PostContext'; // Import PostContext

const Post = () => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const { addPost } = useContext(PostContext); // Use PostContext

    const navigate = useNavigate();

    useEffect(() => {
        // Set the initial date to today's date
        const today = new Date().toISOString().split('T')[0];
        setDate(today);

        // Fetch the books from the backend
        axios.get('http://localhost:3002/book/books')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                console.error('Error fetching books:', err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { username, comment, date, selectedBook };
        axios.post('http://localhost:3002/post/posts', newPost)
            .then(res => { 
                if (res.data.submitted) {
                    addPost(newPost); // Update the context with the new post
                    navigate('/classforum'); // Navigate to the forum page
                }
            })
            .catch(err => {
                console.error('Error submitting post:', err);
            });
    };

    const handleCancel = () => {
        navigate('/classforum');
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>

                <div className="form-group">
                    <label htmlFor="book">Book:</label>
                    <select id="book" name="book" onChange={(e) => setSelectedBook(e.target.value)}>
                        <option value="">Select a book</option>
                        {books.map(book => (
                            <option key={book._id} value={book.title}>{book.title}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Student Name:</label>
                    <input type="text" id="username" name="username" 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="text" id="date" name="date" 
                    value={date} readOnly />
                </div>

                <div className="comment-group">
                    <label htmlFor="comment">Comments:</label>
                    <input type="text" id="comment" name="comment" 
                    onChange={(e) => setComment(e.target.value)} />
                </div>

                <div className="buttons"> 
                    <input type="submit" value="Submit Post" className="post-button" /> 
                </div>
            </form>
        </div>
    );
};

export default Post;


