import BillingCycle from "../Domain/Entity/BillingCycle";
import BillingCycleSchema from "../Domain/Schema/BillingCycle";
import billingCycleData from "../../tests/Fixture/BillingCycleData.json";

class CreateBillingForTest {

    static async execute(): Promise<Array<BillingCycle>> {
        const billingsCreated = new Array<BillingCycle>();

        for (const billing of billingCycleData) {
            const { name, credits, debits, month, year } = billing;

            const billingCycle = BillingCycle.create(name, month, year, credits, debits);

            await BillingCycleSchema.create(billingCycle);

            billingsCreated.push(billingCycle);
        }

        return billingsCreated;
    }
}

export default CreateBillingForTest;