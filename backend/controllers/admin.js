import bcrypt from 'bcryptjs';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Places from '../models/Places.js';
import Services from '../models/Services.js';
import Bookings from '../models/Bookings.js';
import DayCount from '../models/DayCount.js';
import User from '../models/User.js';

export const signup = async (req, res, next) => {
    // console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newAdmin = new Admin({ ...req.body, password: hash });
        await newAdmin.save();

        // Also set a cookie
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT);
        const { password, ...others } = newAdmin._doc;
        res.cookie('acc_tok', token, {
            httpOnly: true
        })
            .status(200)
            .json({ ...others, token });
    } catch (err) {
        res.status(200).json({ msg: 'Email address alreadt in use!' });
    }
};

export const signin = async (req, res, next) => {
    // console.log(req.body);
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            res.status(200).json({ msg: 'No such email exists!' });
        }

        const pass = await bcrypt.compare(req.body.password, admin.password);
        if (!pass) {
            res.status(200).json({ msg: 'Wrong Password!' });
        }

        // Set a cookie
        const token = jwt.sign({ id: admin._id }, process.env.JWT);
        const { password, ...others } = admin._doc;
        res.cookie('acc_tok', token, {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        })
            .status(200)
            .json({ ...others, token });

        // res.status(200).send('Loggedin!');
    } catch (err) { }
};

export const addPlace = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        const findplace = await Places.findOne({ name: req.body.name });
        if (findplace) {
            res.status(200).json({
                msg: 'Such Location already exists! Not adding current location'
            });
        }

        const place = new Places({ name: req.body.name, desc: req.body.desc });
        await place.save();
        res.status(200).json({ msg: 'Added Location!', ...place });
    } else {
        return next(createError(403, 'Not authorized to add place'));
    }
};

export const addService = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        const findservice = await Services.findOne({ name: req.body.name });
        if (findservice) {
            res.status(200).json({
                msg: 'Such Service already exists! Not adding current service. '
            });
        }

        const service = new Services({
            name: req.body.name,
            desc: req.body.desc
        });
        await service.save();
        res.status(200).json({ msg: 'Added Service!', ...service });
    } else {
        return next(createError(403, 'Not authorized to add service'));
    }
};

export const acceptBooking = async (req, res, next) => {
    const booked = await Bookings.findOneAndUpdate(
        { _id: req.params.id },
        {
            status: 'accepted'
        },
        { new: true }
    );

    const filter = { place: booked.place };
    const update = { $inc: { count: 1 } };

    let dc = await DayCount.findOneAndUpdate(filter, update, {
        new: true
    });

    res.status(200).json({ msg: 'Order Accepted!', ...booked });
};

export const rejectBooking = async (req, res, next) => {
    const booked = await Bookings.findOneAndUpdate(
        { _id: req.params.id },
        {
            status: 'rejected'
        },
        { new: true }
    );

    res.status(200).json({ booked });
};

export const getBookings = async (req, res, next) => {
    var booked = await Bookings.find({});
    var final = [];

    var st = 0;
    for (const i of booked) {
        // console.log(i);
        const userdetails = await User.findOne({ _id: i.userId });
        // console.log();
        final.push({
            ...booked[st]._doc,
            name: userdetails.name,
            email: userdetails.email
        });
        console.log();
        st += 1;
    }

    res.status(200).json({ ...final });
};

export const filterDate = async (req, res, next) => {
    const booked = await Bookings.find({ date: req.body.date });
    var final = [];

    var st = 0;
    for (const i of booked) {
        // console.log(i);
        const userdetails = await User.findOne({ _id: i.userId });
        // console.log();
        final.push({
            ...booked[st]._doc,
            name: userdetails.name,
            email: userdetails.email
        });
        console.log();
        st += 1;
    }
    res.status(200).json({ ...final });
};

export const filterPlace = async (req, res, next) => {
    const booked = await Bookings.find({ place: req.body.place });
    var final = [];

    var st = 0;
    for (const i of booked) {
        // console.log(i);
        const userdetails = await User.findOne({ _id: i.userId });
        // console.log();
        final.push({
            ...booked[st]._doc,
            name: userdetails.name,
            email: userdetails.email
        });
        console.log();
        st += 1;
    }
    res.status(200).json({ ...final });
};
