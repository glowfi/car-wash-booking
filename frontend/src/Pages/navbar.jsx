import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth } from '../isAuth';

const Navbar = () => {
    const hasUser = localStorage.getItem('uid');
    const name = localStorage.getItem('nm');
    const nav = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/">CarWash.com</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav cent">
                    <li className="nav-item active">
                        <a
                            className="nav-link"
                            href="/allBookings"
                        // onClick={() => {
                        //     isAuth();
                        //     nav('/allBookings');
                        // }}
                        >
                            See All Bookings<span className="sr-only"></span>
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                {hasUser ? (
                    <div className="al">
                        <p>Username :{JSON.parse(name)} </p>
                        <button
                            className="btn btn-primary logout"
                            onClick={() => {
                                localStorage.clear();
                                nav('/');
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </nav>
    );
};

export default Navbar;
