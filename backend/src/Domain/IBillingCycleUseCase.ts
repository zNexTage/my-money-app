import BillingCycleDto from "./DTO/BillingCycleDto";
import BillingCycle from "./Entity/BillingCycle";


interface IBillingCycleUseCase {
    findAll(): Promise<Array<BillingCycle>>;
    findById(id: string): Promise<BillingCycle>;
    create(billingCycle: BillingCycleDto): Promise<BillingCycle>;
    update(id: string, billingCycle: BillingCycleDto): Promise<BillingCycle>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}

export default IBillingCycleUseCase;