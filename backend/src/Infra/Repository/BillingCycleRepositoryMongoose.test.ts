import SetupMongooseTest from "../../Config/Database/MongooseTest";

const mongooseDb = new SetupMongooseTest();

beforeAll(async () => {
    await mongooseDb.execute();
});

afterAll(async () => {
    await mongooseDb.getConnection()?.connection.dropDatabase();
})

describe("BillingCycleRepositoryMongoose Repository", () => {
    test("Teste", () => {

    })
});