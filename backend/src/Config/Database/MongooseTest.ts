import mongoose from "mongoose";
import billingCycleData from "../../../tests/Fixture/BillingCycleData.json";
import BillingCycle from "../../Domain/Schema/BillingCycle";
import ISetupLoader from "../../Loader/ISetupLoader";

class SetupMongooseTest implements ISetupLoader {
    private connection: typeof mongoose | undefined;

    async execute(): Promise<void> {
        this.connection = await mongoose.connect('mongodb://localhost/mymoney-test');
    }

    getConnection() {
        return this.connection;
    }
}

export default SetupMongooseTest;