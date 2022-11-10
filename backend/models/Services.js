import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Service', ServicesSchema);
