import express from 'express';
import {
    signin,
    signup,
    addPlace,
    addService,
    acceptBooking,
    rejectBooking,
    getBookings,
    filterPlace,
    filterDate
} from '../controllers/admin.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// SignUp
router.post('/signup', signup);

// Signin
router.post('/signin', signin);

// Add Place
router.post('/addplace/:id', verifyToken, addPlace);

// Add Service
router.post('/addservice/:id', verifyToken, addService);

// Accept booking
router.post('/acceptbooking/:id', verifyToken, acceptBooking);

// Reject booking
router.post('/rejectbooking/:id', verifyToken, rejectBooking);

// Get all bookings
router.get('/getbookings', verifyToken, getBookings);
router.post('/filterDate', verifyToken, filterDate);
router.post('/filterPlace', verifyToken, filterPlace);

export default router;
