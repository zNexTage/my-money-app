import BillingCycle from "../../src/Domain/Entity/BillingCycle";
import { DebitStatus } from "../../src/Domain/Entity/Debit";

describe("Billing cycle functional tests", () => {
    it("should verify that payment cycles are being returned.", async () => {
        const { body, status } = await global.testRequest.get('/api/billing-cycle');

        expect(status).toBe(200);
        expect(body).toEqual([]);
    });

    it('Should be able to get billing cycle by id', async () => {
        const { body, status } = await global.testRequest.get('/api/billing-cycle/1');

        expect(status).toBe(200);
    })

    it("Should be able to request and create a billing cycle", async () => {
        const data: BillingCycle = {
            name: 'Janeiro/17',
            month: 1,
            year: 2017,
            credits: [{
                name: 'Salario Empresa',
                value: 6500
            }, {
                name: 'Salario Professor',
                value: 2700
            }],
            debits: [{
                name: 'Telefone',
                value: 150,
                status: DebitStatus.PAGO
            }]
        }

        const { body, status } = await global.testRequest.post('/api/billing-cycle').send(data);

        expect(status).toBe(201);
        expect(body).toEqual(data);
    })
})
