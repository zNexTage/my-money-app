import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from "@overnightjs/core";
import IBillingCycleUseCase from '../../Domain/IBillingCycleUseCase';
import BillingCycle from '../../Domain/Entity/BillingCycle';

@Controller('api/billing-cycle')
class BillingCycleController {
    constructor(
        private billingCycleUseCase: IBillingCycleUseCase
    ) { }

    @Get()
    async getBillingCycle(req: Request, res: Response) {
        try {
            const billings = await this.billingCycleUseCase.findAll();

            return res.send(billings)
        }
        catch (err) {
            console.log(err);
            return res.send(err);
        }

    }

    @Get(':id')
    async getBillingCycleById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const billing = this.billingCycleUseCase.findById(id);

            return res.status(200).send(billing);
        }
        catch (err) {
            return res.send(err);
        }
    }

    @Post()
    async createBillingCycle(req: Request, res: Response) {
        const body = req.body as BillingCycle;

        const billing = await this.billingCycleUseCase.create(body);

        return res.status(201).send(billing);
    }

    @Put(':id')
    async updateBillingCycle(req: Request, res: Response) {
        const { id } = req.params;
        const body = req.body as BillingCycle;

        const billing = this.billingCycleUseCase.update(id, body);

        return res.status(201).send(billing);
    }

    @Delete(':id')
    async deleteBillingCycle(req: Request, res: Response) {
        const { id } = req.params;

        await this.billingCycleUseCase.delete(id);

        return res.status(204).send();
    }

}

export default BillingCycleController;