import BillingCycleSchema from "../../Domain/Schema/BillingCycle";
import IBillingCycleRepository from "../../Domain/IBillingCycleRepository";
import BillingCycle from "../../Domain/Entity/BillingCycle";

type BilingCycleMongoose = {
    _id: string;
    name: string;
    month: number;
    year: number;
    credits: Array<{ name: string, value: number }>,
    debits: Array<{ name: string, value: number, status: string }>
}

class BillingCycleRepositoryMongoose implements IBillingCycleRepository {
    async findAll(): Promise<BillingCycle[]> {
        const billingCycles = await BillingCycleSchema.find<BillingCycle>();

        return billingCycles;
    }
    async findById(id: string): Promise<BillingCycle | null> {
        const billing = await BillingCycleSchema.findById<BilingCycleMongoose>(id)!;

        if (!billing) return null;

        const { _id, credits, debits, month, name, year } = billing;

        return BillingCycle.create(name, month, year, credits, debits, _id);
    }
    async create(billingCycle: BillingCycle): Promise<BillingCycle> {
        const billingCycleCreated = await BillingCycleSchema.create(billingCycle);

        return billingCycleCreated;
    }
    async update(id: string, billingCycle: BillingCycle): Promise<BillingCycle> {
        await BillingCycleSchema.updateOne({ _id: id }, billingCycle, { upsert: false });

        const billing = await this.findById(id);        
        
        return billing!;
    }
    async delete(id: string): Promise<void> {
        await BillingCycleSchema.deleteOne({ _id: id });        
    }

}

export default BillingCycleRepositoryMongoose;