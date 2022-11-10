import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        service: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Booking', BookingSchema);
