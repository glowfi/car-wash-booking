import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { server } from '../constants';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [errmsg, seterrmsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = await axios.post(`${server}/api/admin/signin`, {
            email: email,
            password: password
        });
        // console.log(data.data._id);

        if (data.data.msg) {
            seterrmsg(data.data.msg);
        } else {
            localStorage.clear();
            localStorage.setItem('uid', JSON.stringify(data.data._id));
            localStorage.setItem('nm', JSON.stringify(data.data.name));

            setemail('');
            setpassword('');
            navigate('/admin');
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="spContainer mx-auto">
                    {errmsg ? (
                        <div
                            className="alert alert-danger alert-dismissible fade show"
                            role="alert"
                        >
                            <strong>{errmsg}</strong>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={() => {
                                    seterrmsg('');
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className="card px-4 py-5 border-0 shadow">
                        <div className="d-inline text-left mb-3">
                            <h3
                                className="font-weight-bold"
                                style={{ textAlign: 'center' }}
                            >
                                ADMIN LOGIN PORTAL
                            </h3>
                        </div>
                        <div className="d-inline text-center mb-0">
                            <div className="form-group mx-auto">
                                <input
                                    className="form-control inpSp"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="d-inline text-center mb-3">
                            <div className="form-group mx-auto">
                                <input
                                    className="form-control inpSp"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="d-inline text-left mb-3 mx-auto">
                            <div className="form-group mx-auto">
                                <button
                                    className="btn btn-dark"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
