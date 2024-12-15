import React, { useState } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState(''); // Added state for description
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/book/add', { title, author, category, level, imageUrl, description })
            .then(res => { 
                if(res.data.added) {
                    navigate('/books');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Add Book</h2>

                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" 
                    onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" 
                    onChange={(e) => setAuthor(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" 
                    onChange={(e) => setCategory(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="level">Grade Level:</label>
                    <input type="text" id="level" name="level" 
                    onChange={(e) => setLevel(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input type="text" id="image" name="image" 
                    onChange={(e) => setImageUrl(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label> {/* Added label and textarea for description */}
                    <textarea id="description" name="description" 
                    onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group buttons">
                    <input type="submit" value="Add" />
                    <input type="button" value="Cancel" onClick={handleCancel} />
                </div>
            </form>
        </div>
    );
};

export default AddBook;

