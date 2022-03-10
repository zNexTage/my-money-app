import mongoose from "mongoose";

const Debit = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true },
    status: {
        type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    },
});

export { Debit };

export default mongoose.model('Debit', Debit);