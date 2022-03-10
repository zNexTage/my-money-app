import BillingCycleRepositoryMongoose from "../Infra/Repository/BillingCycleRepositoryMongoose";
import BillingCycleUseCase from "./BillingCycleUseCase";
import billingCycleData from "../../tests/Fixture/BillingCycleData.json";
import BillingCycleSchema from "../Domain/Schema/BillingCycle";
import SetupMongooseTest from "../Config/Database/MongooseTest";
import BillingCycle from "../Domain/Entity/BillingCycle";
import { DebitStatus } from "../Domain/Entity/Debit";
import BillingCycleDto from "../Domain/DTO/BillingCycleDto";
import CreateBillingForTest from "../Util/CreateBillingForTest";

const mongooseDb = new SetupMongooseTest();

const billingCycleRepo = new BillingCycleRepositoryMongoose();
const billingCycleUseCase = new BillingCycleUseCase(billingCycleRepo);

beforeAll(async () => {
    await mongooseDb.execute();
});

afterAll(async () => {
    await mongooseDb.getConnection()?.connection.dropDatabase();
})

describe("BillingCycleUseCase", () => {
    let billingsCreated = new Array<BillingCycle>();

    beforeAll(async () => {
        for (const billing of billingCycleData) {
            const { name, credits, debits, month, year } = billing;

            const billingCycle = BillingCycle.create(name, month, year, credits, debits);

            await BillingCycleSchema.create(billingCycle);

            billingsCreated.push(billingCycle);
        }
    });


    test("Should be able to get all BillingCycles", async () => {
        const billingCycles = await billingCycleUseCase.findAll();

        expect(billingCycles).toBeInstanceOf(Array);
        expect(billingCycles.length).toEqual(billingCycleData.length);

        for (const billing of billingCycles) {
            expect(billing).toHaveProperty("_id");
        }
    });

    test("Should be able to get Billing by id", async () => {
        for (const billingCreated of billingsCreated) {
            const billingCycleFinded = await billingCycleUseCase.findById(billingCreated.getId());

            expect(billingCycleFinded).toBeTruthy();
            expect(billingCycleFinded.getId()).toEqual(billingCreated.getId())
            expect(billingCycleFinded.name).toEqual(billingCreated.name);
            expect(billingCycleFinded.month).toEqual(billingCreated.month);
            expect(billingCycleFinded.year).toEqual(billingCreated.year);
        }
    });

    test("Should not able to get a non exists Billing", async () => {
        const getANonExistsBilling = async () => {
            await billingCycleUseCase.findById("123");
        }

        expect(getANonExistsBilling).rejects.toThrowError('Billing Cycle does not exists')
    });

    test("Should be able to create a billing", async () => {
        const billig: BillingCycleDto = {
            name: "Teste", month: 1,
            year: 2022, credits: [{ name: "Cred", value: 1250 }],
            debits: [{ name: "Deb", value: 1350, status: DebitStatus.AGENDADO }]
        };

        const billigCycle = await billingCycleUseCase.create(billig);

        expect(billigCycle).toBeTruthy();
        expect(billigCycle.name).toEqual(billig.name);
        expect(billigCycle.month).toEqual(billig.month);
        expect(billigCycle.year).toEqual(billig.year);
        expect(billigCycle.credits.length).toEqual(billig.credits.length);
        expect(billigCycle.debits.length).toEqual(billig.debits.length);

        for (let i = 0; i < billigCycle.credits.length; i++) {
            const creditsData = billig.credits[i];
            const creditsCreated = billigCycle.credits[i];

            expect(creditsCreated.name).toEqual(creditsData.name);
            expect(creditsCreated.value).toEqual(creditsData.value);
        }

        for (let i = 0; i < billigCycle.debits.length; i++) {
            const debitsData = billig.debits[i];
            const debitsCreated = billigCycle.debits[i];

            expect(debitsCreated.name).toEqual(debitsData.name);
            expect(debitsCreated.value).toEqual(debitsData.value);
        }
    });

    test("Should be able to update a billing", async () => {
        const billingDataToUpdate: BillingCycleDto = {
            name: "Teste", month: 1,
            year: 2022, credits: [{ name: "Cred", value: 1250 }],
            debits: [{ name: "Deb", value: 1350, status: DebitStatus.AGENDADO }]
        };

        const billingToUpdate = billingsCreated[0];

        const billigCycle = await billingCycleUseCase.update(billingToUpdate.getId(), billingDataToUpdate);

        expect(billigCycle).toBeTruthy();
        expect(billigCycle.getId()).toEqual(billingToUpdate.getId())

        expect(billigCycle.name).toEqual(billingDataToUpdate.name)
        expect(billigCycle.month).toEqual(billingDataToUpdate.month)
        expect(billigCycle.year).toEqual(billingDataToUpdate.year)

        expect(billigCycle.credits.length).toEqual(billingDataToUpdate.credits.length);
        expect(billigCycle.debits.length).toEqual(billingDataToUpdate.debits.length);

        for (let i = 0; i < billigCycle.credits.length; i++) {
            const creditsData = billigCycle.credits[i];
            const creditsUpdated = billingDataToUpdate.credits[i];

            expect(creditsUpdated.name).toEqual(creditsData.name);
            expect(creditsUpdated.value).toEqual(creditsData.value);
        }

        for (let i = 0; i < billigCycle.debits.length; i++) {
            const debitsData = billigCycle.debits[i];
            const debitsUpdated = billingDataToUpdate.debits[i];

            expect(debitsUpdated.name).toEqual(debitsData.name);
            expect(debitsUpdated.value).toEqual(debitsData.value);
        }
    });

    test("Should not be able to update a non exists billing", async () => {
        const billingDataToUpdate: BillingCycleDto = {
            name: "Teste", month: 1,
            year: 2022, credits: [{ name: "Cred", value: 1250 }],
            debits: [{ name: "Deb", value: 1350, status: DebitStatus.AGENDADO }]
        };

        const updateANonExistsBilling = async () => {
            await billingCycleUseCase.update("123", billingDataToUpdate);
        }

        expect(updateANonExistsBilling).rejects.toThrowError('Billing Cycle does not exists');
    });

    test("Should be able to delete a billing", async () => {
        const billingToUpdate = billingsCreated[0];

        await billingCycleUseCase.delete(billingToUpdate.getId());
        const getBillingAfterDelete = async () => {
            await billingCycleUseCase.findById(billingToUpdate.getId())
        }

        expect(getBillingAfterDelete).rejects.toThrowError('Billing Cycle does not exists')
    });

    test("Should not be able to delete a non exists billing", async () => {
        const deleteANonExistsBilling = async () => {
            await billingCycleUseCase.delete("123");
        }

        expect(deleteANonExistsBilling).rejects.toThrowError('Billing Cycle does not exists');
    });
});
