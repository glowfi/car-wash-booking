import axios from 'axios';
import React, { useState } from 'react';
import { server } from '../constants';
import Navbar from './navbar';

const Addserv = () => {
    const [service, setservice] = useState('');
    const [desc, setdesc] = useState('');
    const [msg, setmsg] = useState('');
    const uid = JSON.parse(localStorage.getItem('uid'));

    const handleaddserv = async () => {
        console.log(desc, service);
        const data = await axios.post(`${server}/api/admin/addservice/${uid}`, {
            name: service,
            desc: desc
        });
        console.log(data);
        if (data.data.msg) {
            setmsg(data.data.msg);
            setservice('');
            setdesc('');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="my-4">ADD SERVICE</h1>
                {msg ? (
                    <div
                        className="alert alert-info alert-dismissible fade show"
                        role="alert"
                    >
                        <strong>{msg}</strong>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                                setmsg('');
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ) : (
                    ''
                )}

                <div class="form-group">
                    <label for="exampleFormControlInput1"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Service name"
                        value={service}
                        onChange={(e) => {
                            setservice(e.target.value);
                        }}
                    />
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"></label>
                    <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Write description of the service"
                        value={desc}
                        onChange={(e) => {
                            setdesc(e.target.value);
                        }}
                    ></textarea>
                </div>
                <button className="btn btn-info" onClick={handleaddserv}>
                    ADD SERVICE
                </button>
            </div>
        </>
    );
};

export default Addserv;
