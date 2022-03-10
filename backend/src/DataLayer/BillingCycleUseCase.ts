import BillingCycleDto from "../Domain/DTO/BillingCycleDto";
import BillingCycle from "../Domain/Entity/BillingCycle";
import IBillingCycleRepository from "../Domain/IBillingCycleRepository";
import IBillingCycleUseCase from "../Domain/IBillingCycleUseCase";

class BillingCycleUseCase implements IBillingCycleUseCase {
    constructor(
        private billingCycleRepositoty: IBillingCycleRepository
    ) { }

    async findAll(): Promise<BillingCycle[]> {
        return await this.billingCycleRepositoty.findAll();
    }

    async findById(id: string): Promise<BillingCycle> {
        const isExists = await this.exists(id);

        if (!isExists) {
            throw new Error(`Billing Cycle does not exists`);
        }

        const billig = await this.billingCycleRepositoty.findById(id);

        return billig!;
    }

    async create({ name, credits, debits, month, year }: BillingCycleDto): Promise<BillingCycle> {
        const billingCycle = BillingCycle.create(name, month, year, credits, debits);

        return await this.billingCycleRepositoty.create(billingCycle);
    }

    async update(id: string, { name, credits, debits, month, year }: BillingCycleDto): Promise<BillingCycle> {
        const isExists = await this.exists(id);

        if (!isExists) {
            throw new Error(`Billing Cycle does not exists`);
        }

        const billingCycle = BillingCycle.create(name, month, year, credits, debits, id);

        return await this.billingCycleRepositoty.update(id, billingCycle);
    }

    async delete(id: string): Promise<void> {
        const isExists = await this.exists(id);

        if (!isExists) {
            throw new Error(`Billing Cycle does not exists`);
        }

        return await this.billingCycleRepositoty.delete(id);
    }

    async exists(id: string): Promise<boolean> {
        const billingCycle = await this.billingCycleRepositoty.findById(id);

        if (!billingCycle) return false;
        else return true;
    }

}

export default BillingCycleUseCase;