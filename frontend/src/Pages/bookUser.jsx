import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../constants';
import Navbar from './navbar';
import { isAuth } from '../isAuth';

const Bookuser = () => {
    isAuth();
    const [allBook, setallBook] = useState([]);
    const uid = JSON.parse(localStorage.getItem('uid'));
    // console.log(uid);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${server}/api/user/getbook/${uid}`);
            setallBook(Object.entries(data.data));
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '1rem' }}>
                <h1>All Bookings</h1>
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Service Type</th>
                            <th scope="col">Date selected</th>
                            <th scope="col">Place</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(allBook)}
                        {allBook.map((p, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{p[1]['service']}</td>
                                    <td>{p[1]['date']}</td>
                                    <td>{p[1]['place']}</td>
                                    <td>{p[1]['status']}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Bookuser;
