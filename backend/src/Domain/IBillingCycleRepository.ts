import BillingCycle from "./Entity/BillingCycle";

interface IBillingCycleRepository {
    findAll(): Promise<Array<BillingCycle>>;
    findById(id: string): Promise<BillingCycle | null>;
    create(billingCycle: BillingCycle): Promise<BillingCycle>;
    update(id: string, billingCycle: BillingCycle): Promise<BillingCycle>;
    delete(id: string): Promise<void>;
}

export default IBillingCycleRepository;