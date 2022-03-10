import Credit from "../Entity/Credit";
import DebitDto from "./DebitDto";

class BillingCycleDto {
    constructor(
        public name: string,
        public month: number,
        public year: number,
        public credits: Array<Credit>,
        public debits: Array<DebitDto>,
    ) { }
}

export default BillingCycleDto;