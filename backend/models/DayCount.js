import mongoose from 'mongoose';

const dayCountSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        },
        place: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('daycount', dayCountSchema);
