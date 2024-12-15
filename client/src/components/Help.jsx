import React, { useState } from "react";
import "../css/AddStudent.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Help = () => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/help/help', { username, comment })
            .then(res => { 
                if (res.data.submitted) {
                    navigate('/');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="student-form-container">
            <form className="student-form" onSubmit={handleSubmit}>
                <h2>Have ideas of new books you'd like to journey through within Ready..Set..Read..,
                    let us know! We'd love to hear from you.
                </h2>

                <div className="form-group">
                    <label htmlFor="username">Student Name:</label>
                    <input type="text" id="username" name="username" 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="comment-group">
                    <label htmlFor="comment">Comments or Recommendations:</label>
                    <input type="text" id="comment" name="comment" 
                    onChange={(e) => setComment(e.target.value)} />
                </div>

                <div className="form-group buttons"> 
                    <input type="submit" value="Submit" /> 
                    <input type="button" value="Cancel" />
                </div>
            </form>
        </div>
    );
};

export default Help;

