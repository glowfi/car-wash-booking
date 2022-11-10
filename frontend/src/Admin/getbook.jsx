import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { server } from '../constants';
import Navbar from './navbar';

const Getbookall = () => {
    const [book, setbook] = useState([]);
    const uid = JSON.parse(localStorage.getItem('uid'));
    const nav = useNavigate();
    const [date, setdate] = useState('');
    const [places, setplaces] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${server}/api/admin/getbookings`);
            setbook(Object.entries(data.data));
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data2 = await axios.get(`${server}/api/user/getplaces`);
            setplaces(Object.entries(data2.data));
        };
        fetchData();
        console.log(places);
    }, []);

    const handleAccept = async (bookid) => {
        // console.log(bookid);
        const data = await axios.post(
            `${server}/api/admin/acceptbooking/${bookid}`
        );
        console.log(data.data);
        window.location.reload();
    };
    const handleReject = async (bookid) => {
        // console.log(bookid);
        const data = await axios.post(
            `${server}/api/admin/rejectbooking/${bookid}`
        );
        console.log(data.data);
        window.location.reload();
    };

    const handleFilterByDate = async (dt) => {
        // console.log(dt);
        const data = await axios.post(`${server}/api/admin/filterDate`, {
            date: dt
        });
        // console.log(data.data);
        setbook(Object.entries(data.data));
    };

    const handleFilterByPlace = async (loc) => {
        const data = await axios.post(`${server}/api/admin/filterPlace`, {
            place: loc
        });
        console.log(data.data);
        setbook(Object.entries(data.data));
    };

    const getAll = async () => {
        const data = await axios.get(`${server}/api/admin/getbookings`);
        setbook(Object.entries(data.data));
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h1 className="my-4">All Bookings</h1>
                {/* <button className="btn btn-info">Filter By Date</button> */}
                {/* <button className="btn btn-warning">Filter By Place</button> */}

                <button
                    type="button"
                    class="btn btn-primary btn-info"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    Filter By Date
                </button>

                <button
                    type="button"
                    class="btn btn-primary btn-warning"
                    data-toggle="modal"
                    data-target="#exampleModal1"
                >
                    Filter By Place
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        getAll();
                    }}
                >
                    Show All
                </button>

                <div
                    class="modal fade"
                    id="exampleModal1"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel1"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel1">
                                    Filter By Location
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3>Pick Place</h3>
                                <select
                                    class="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example w-30"
                                    id="location"
                                >
                                    <option selected>Choose Location</option>
                                    {places.map((p, idx) => {
                                        return (
                                            <>
                                                <option value={p[1]['name']}>
                                                    {p[1]['name']}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        var e =
                                            document.getElementById('location');
                                        var value =
                                            e.options[e.selectedIndex].value;
                                        let loc =
                                            e.options[e.selectedIndex].text;
                                        handleFilterByPlace(loc);
                                    }}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    Filter By Date
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3>Pick Date</h3>
                                <label
                                    for="birthday"
                                    style={{ color: 'white' }}
                                >
                                    Date:{' '}
                                </label>
                                <br />
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    value={date}
                                    onChange={(e) => {
                                        setdate(e.target.value);
                                    }}
                                />
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        setdate(
                                            date.split('-').reverse().join('-')
                                        );
                                        handleFilterByDate(date);
                                    }}
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Service Type</th>
                            <th scope="col">Date selected (YYYY-MM-DD)</th>
                            <th scope="col">Place</th>
                            <th scope="col">Status</th>
                            <th scope="col">Accept</th>
                            <th scope="col">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log(allBook)} */}
                        {book.map((p, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{p[1]['name']}</td>
                                    <td>{p[1]['email']}</td>
                                    <td>{p[1]['service']}</td>
                                    <td>{p[1]['date']}</td>
                                    <td>{p[1]['place']}</td>
                                    <td>{p[1]['status']}</td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                handleAccept(p[1]['_id']);
                                            }}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                handleReject(p[1]['_id']);
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Getbookall;
