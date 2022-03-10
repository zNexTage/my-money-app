import Credit from "./Credit";
import Debit, { DebitStatus } from "./Debit";
import { v4 } from "uuid";
import DebitDto from "../DTO/DebitDto";

class BillingCycle {

    private constructor(
        public name: string,
        public month: number,
        public year: number,
        public credits: Array<Credit>,
        public debits: Array<Debit>,
        private readonly _id?: string,
    ) { }

    public static create(name: string, month: number, year: number, credits: Array<Credit>, debitsDto: Array<DebitDto>, id?: string) {
        const _id = id ? id : v4();

        const debits = debitsDto.map(({ name, status, value }) => {
            return new Debit(name, value, <DebitStatus>status);
        });

        return new BillingCycle(name, month, year, credits, debits, _id);
    }

    getId(): string {
        return this._id!;
    }
}

export default BillingCycle;