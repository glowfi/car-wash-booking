import React from 'react';
import Book from './Pages/Book';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

import LoginAd from './Admin/Login';
import HomeAd from './Admin/Home';
import Addserv from './Admin/addserv';
import Addplace from './Admin/addplace';
import GetBook from './Admin/getbook';

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Bookuser from './Pages/bookUser';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/book" element={<Book />} />
            <Route path="/allBookings" element={<Bookuser />} />
            <Route path="/admin" element={<HomeAd />} />
            <Route path="/admin/signin" element={<LoginAd />} />
            <Route path="/admin/addserv" element={<Addserv />} />
            <Route path="/admin/addlocation" element={<Addplace />} />
            <Route path="/admin/allBookings" element={<GetBook />} />
        </Routes>
    );
};

export default App;
