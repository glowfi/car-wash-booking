import express from 'express';
import {
    book,
    cancelbook,
    signin,
    signup,
    checkbook,
    getbook,
    getServices,
    getPlaces
} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// SignUp
router.post('/signup', signup);

// Signin
router.post('/signin', signin);

// Book a Car wash
router.post('/book/:id', verifyToken, book);

// Check Book a Car wash
router.post('/checkbook/:id', verifyToken, checkbook);

// Cancel car wash
router.post('/cancelbook/:id', verifyToken, cancelbook);

// Get all his bookings
router.get('/getbook/:id', verifyToken, getbook);
router.get('/getplaces', verifyToken, getPlaces);
router.get('/getservices', verifyToken, getServices);

export default router;
