import mongoose from "mongoose";

const Credit = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true },
});

export { Credit }

export default mongoose.model('Credit', Credit);