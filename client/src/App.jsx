import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Books from './components/Books';
import Login from './components/Login';
import About from './components/About';
import Forum from './components/Forum';
import Help from './components/Help';
import Dashboard from './components/Dashboard';
import BookDetail from './components/BookDetail';
import AddStudent from './components/AddStudent';
import AddBook from './components/AddBook';
import Post from './components/Post';
import { StudentProvider } from './components/StudentContext';
import EditStudent from './components/EditStudent';
import { CartProvider } from './components/MyBooks';
import MyCart from './components/MyCart';
import PostDetails from './components/PostDetails';
import { PostProvider } from './components/PostContext';
import ClassForum from './components/ClassForum';
import { useState } from 'react';
import Footer from './components/Footer'; // Import Footer component
import { AuthProvider } from './components/AuthContex';
function App() {
    const [role, setRole] = useState('');

    return (
        <StudentProvider>
            <PostProvider>
                <CartProvider>
                    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                        <Navbar role={role} setRole={setRole} />
                        <div className="main-content">
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/books' element={<Books />} />
                                <Route path='/forum' element={<Forum />} />
                                <Route path='/classforum' element={<ClassForum />} />
                                <Route path='/help' element={<Help />} />
                                <Route path='/book/bookdetails/:id' element={<BookDetail />} />
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/login' element={<Login setRole={setRole} />} />
                                <Route path='/addstudent' element={<AddStudent />} />
                                <Route path='/editstudent/:id' element={<EditStudent />} />
                                <Route path='/mybooks' element={<MyCart />} /> {/* Render MyCart component */}
                                <Route path='/addbook' element={<AddBook />} />
                                <Route path='/post' element={<Post />} />
                                <Route path='/postdetails/:id' element={<PostDetails />} />
                                <Route path='/mycart' element={<MyCart />} />
                            </Routes>
                        </div>
                        <Footer /> {/* Include Footer component */}
                    </BrowserRouter>
                </CartProvider>
            </PostProvider>
        </StudentProvider>
    );
}

export default App;








