import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../constants';
import Navbar from './navbar';

const Book = () => {
    // Get all places
    const [date, setdate] = useState('');
    const uid = JSON.parse(localStorage.getItem('uid'));

    const [places, setplaces] = useState([]);
    const [services, setservices] = useState([]);

    const [msg, setmsg] = useState('');
    const navigate = useNavigate();

    const handleBooking = async (pla, ser, dt) => {
        const data = await axios.post(`${server}/api/user/book/${uid}`, {
            place: pla,
            service: ser,
            date: dt
        });
        if (data.data.msg) {
            setmsg(data.data.msg);
        } else {
            setmsg(data.data._msg);
            setTimeout(() => {
                navigate('/allBookings');
            }, 4000);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data1 = await axios.get(`${server}/api/user/getservices`);
            setservices(Object.entries(data1.data));

            const data2 = await axios.get(`${server}/api/user/getplaces`);
            setplaces(Object.entries(data2.data));
        };
        fetchData();
        console.log(places, services);
    }, []);
    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center' }}>Book a Car Wash</h1>
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
            <div className="container">
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
                <br />
                <br />
                <select
                    class="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example w-30"
                    id="service"
                >
                    <option selected>Choose Service Type</option>
                    {services.map((p, idx) => {
                        return (
                            <>
                                <option value={p[1]['name']}>
                                    {p[1]['name']}
                                </option>
                            </>
                        );
                    })}
                </select>
                <br />
                <label for="birthday" style={{ color: 'white' }}>
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
                <br />
                <br />
                <br />
                <button
                    className="btn btn-info"
                    onClick={() => {
                        var e = document.getElementById('location');
                        var value = e.options[e.selectedIndex].value;
                        let loc = e.options[e.selectedIndex].text;

                        var e = document.getElementById('service');
                        var value = e.options[e.selectedIndex].value;
                        let serv = e.options[e.selectedIndex].text;
                        console.log(date.split('-'));
                        setdate(date.split('-').reverse().join('-'));
                        handleBooking(loc, serv, date);
                    }}
                >
                    Book
                </button>
            </div>
        </>
    );
};

export default Book;
