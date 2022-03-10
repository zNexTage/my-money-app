import mongoose from "mongoose";
import { Credit } from "./Credit";
import { Debit } from "./Debit";

const BillingCycle = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, required: true },
    month: { type: Number, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [Credit],
    debits: [Debit]
});


export default mongoose.model('BillingCycle', BillingCycle);