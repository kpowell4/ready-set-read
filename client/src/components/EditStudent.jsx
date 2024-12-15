import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/Dashboard.css";

const EditStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [username, setUsername] = useState('');
    const [grade, setGrade] = useState('');
    const [status, setStatus] = useState('');
    const [borrowed, setBorrowed] = useState('');
    const [returned, setReturned] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3002/student/students/${id}`)
            .then(res => {
                setStudent(res.data);
                setUsername(res.data.username);
                setGrade(res.data.grade);
                setStatus(res.data.status);
                setBorrowed(res.data.borrowed);
                setReturned(res.data.returned);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3002/student/students/${id}`, { username, grade, status, borrowed, returned })
            .then(res => {
                if (res.data.updated) {
                    navigate('/dashboard');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3002/student/students/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/dashboard');
                }
                console.log(res);
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-form-container">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <form className="student-form" onSubmit={handleUpdate}>
                <h2>Edit Student</h2>

                <div className="form-group">
                    <label htmlFor="username">Student Name:</label>
                    <input type="text" id="username" name="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="grade">Grade Level:</label>
                    <input type="text" id="grade" name="grade" value={grade}
                    onChange={(e) => setGrade(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Activity Status:</label>
                    <input type="text" id="status" name="status" value={status}
                    onChange={(e) => setStatus(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="borrowed">Books Borrowed:</label>
                    <input type="text" id="borrowed" name="borrowed" value={borrowed}
                    onChange={(e) => setBorrowed(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="returned">Books Returned:</label>
                    <input type="text" id="returned" name="returned" value={returned}
                    onChange={(e) => setReturned(e.target.value)} />
                </div>

                <div className="form-group buttons">
                    <input type="submit" value="Update" />
                    <button type="button" onClick={handleDelete}>Delete</button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;

