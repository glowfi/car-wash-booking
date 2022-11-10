import Bookings from '../models/Bookings.js';
import DayCount from '../models/DayCount.js';

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';
import Places from '../models/Places.js';
import Services from '../models/Services.js';

export const book = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            // Check location availability
            const bookCheck = await DayCount.findOne({
                place: req.body.place,
                date: req.body.date
            });
            if (bookCheck && bookCheck.count >= 5) {
                return res.status(200).json({ msg: 'Booking is Full!' });
            } else if (bookCheck && bookCheck.date === req.body.date) {
                return res
                    .status(200)
                    .json({ msg: 'Booking exists on the same day!' });
            }

            // const date = new Date();

            // let day = date.getDate();
            // let month = date.getMonth() + 1;
            // let year = date.getFullYear();
            // let currentDate = `${day}-${month}-${year}`;
            // console.log(currentDate);

            // Book
            const Booking = new Bookings({
                userId: req.user.id,
                status: 'pending',
                place: req.body.place,
                service: req.body.service,
                date: req.body.date
            });
            await Booking.save();

            // console.log(req.user.id);

            // Increase Count of Bookings for that place

            // First time create
            if (!bookCheck) {
                const dc = new DayCount({
                    count: 1,
                    place: req.body.place,
                    date: req.body.date
                });
                await dc.save();
                // console.log(dc);
                res.status(200).json({
                    _msg: ' Booking success!  Waiting for a confirmation from car wash center. ',
                    ...Booking._doc
                });
            }
        } catch (err) { }
    } else {
        return next(createError(403, 'You can book using only ur account'));
    }
};

export const cancelbook = (req, res) => {
    res.json('Its success!');
};

export const signup = async (req, res, next) => {
    // console.log(req.body);
    // try {
    const user = await User.findOne({ email: req.body.email });
    if (user?.email === req.body.email) {
        res.status(200).json({ msg: 'Email exists!' });
    } else if (req.body.password.length < 8) {
        console.log(req.body.password.length);
        res.status(200).json({
            msg: 'Password Length must be greater than equal to 8!'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();

        // Set a cookie
        const token = jwt.sign({ id: newUser._id }, process.env.JWT);
        const { password, ...others } = newUser._doc;
        res.cookie('acc_tok', token, {
            httpOnly: true
        })
            .status(200)
            .json({ ...others, token });
    }

    // } catch (err) {
    // next(createError(404, 'Use unique email address!'));
    // res.status(200).json({ msg: 'Email already in use! ' });
    // }
};

export const signin = async (req, res, next) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // return next(createError(404, 'User not found!'));
            res.status(200).json({ msg: 'No such email exists!' });
        } else {
            const pass = await bcrypt.compare(req.body.password, user.password);
            if (!pass) {
                // return next(createError(400, 'Wrong Password!'));
                res.status(200).json({ msg: 'Wrong Password!' });
            }

            // Set a cookie
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            const { password, ...others } = user._doc;
            res.cookie('acc_tok', token, {
                httpOnly: true
            })
                .status(200)
                .json({ ...others, token });
        }

        // res.status(200).send('Loggedin!');
    } catch (err) { }
};

export const checkbook = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            // Check location availability
            const bookCheck = await DayCount.findOne({
                place: req.body.place,
                date: req.body.date
            });
            // console.log(bookCheck.count > 5);
            if (bookCheck && bookCheck.count >= 5) {
                return res.status(200).json({ msg: 'Booking is Full!' });
            }

            return res.status(200).json({ msg: 'Booking Available!' });
        } catch (err) { }
    } else {
        return next(
            createError(
                403,
                'You can check booking availaibility using only ur account'
            )
        );
    }
};

export const getbook = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            // Check location availability
            const getBook = await Bookings.find({
                userId: req.params.id
            });

            return res.status(200).json({ ...getBook });
        } catch (err) { }
    } else {
        return next(createError(403, 'You can get book using only ur account'));
    }
};

export const getPlaces = async (req, res, next) => {
    const place = await Places.find({});

    res.status(200).json({ ...place });
};
export const getServices = async (req, res, next) => {
    const service = await Services.find({});

    res.status(200).json({ ...service });
};
