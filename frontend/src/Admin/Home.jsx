import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth } from '../isAuth';
import './Home.css';
import Navbar from './navbar';

const Home = () => {
    isAuth('admin');
    const navigate = useNavigate();
    // const hasUser = localStorage.getItem('uid');
    // console.log(hasUser);

    return (
        <>
            <Navbar />
            <div className="container cent my-4">
                <h1>WELCOME TO ADMIN PORTAL</h1>
            </div>
            <br />
            <br />
        </>
    );
};

export default Home;
