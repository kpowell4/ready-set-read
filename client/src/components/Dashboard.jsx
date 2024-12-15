import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Dashboard.css";
import { StudentContext } from './StudentContext';

const Dashboard = () => {
    const { students, setStudents } = useContext(StudentContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/student/students')
            .then(res => {
                setStudents(res.data);
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }, [setStudents]);

    return (
        <div className="dashboard">
            
            <div className="header-box">
                <h1>Teacher Dashboard</h1>
                <h2 className='dashboard-text'>Welcome to the Teacher's Dashboard. This dashboard will be used to keep track of each student's progress throughout their library journey within Ready..Set..Read!</h2>
                <button className="add-student-button" onClick={() => navigate('/addstudent')}>Add New Student</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Student ID</th>
                        <th>Grade Level</th>
                        <th>Activity Status</th>
                        <th>Books Borrowed</th>
                        <th>Books Returned</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td onClick={() => navigate(`/editstudent/${student._id}`)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                                {student.username}
                            </td>
                            <td>{student.studentid}</td>
                            <td>{student.grade}</td>
                            <td>{student.status}</td>
                            <td>{student.booksBorrowed}</td>
                            <td>{student.booksReturned}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

