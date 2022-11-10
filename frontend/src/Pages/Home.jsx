import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth } from '../isAuth';
import './Home.css';
import Navbar from './navbar';
import back from './serv.png';

const Home = () => {
    const navigate = useNavigate();
    const hasUser = localStorage.getItem('uid');
    // console.log(hasUser);

    return (
        <>
            <Navbar />
            <br />
            <br />
            <div className="cent al">
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        isAuth();
                        navigate('/book');
                    }}
                >
                    Book a Car wash
                </button>

                {hasUser ? (
                    ''
                ) : (
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                navigate('/signin');
                            }}
                        >
                            Signin
                        </button>

                        <button
                            className="btn btn-success"
                            onClick={() => {
                                navigate('/signup');
                            }}
                        >
                            Create Account
                        </button>
                    </>
                )}
            </div>
            <br />
            <br />
            <br />
            <div className="imgserv">
                <h1>Our Services</h1>
                <img src={back} class="img-fluid" />
            </div>
        </>
    );
};

export default Home;
