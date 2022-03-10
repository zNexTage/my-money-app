import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';
import BillingCycleController from '../Api/Controllers/BillingCycleController';
import BillingCycleUseCase from '../DataLayer/BillingCycleUseCase';
import BillingCycleRepositoryMongoose from '../Infra/Repository/BillingCycleRepositoryMongoose';
import ISetupLoader from '../Loader/ISetupLoader';


class SetupServer extends Server implements ISetupLoader {
    constructor(
        private port: number = 3003
    ) {
        super(true);
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    private setupController():void {
        const billingRepo = new BillingCycleRepositoryMongoose();

        const billingCycleController = new BillingCycleController(new BillingCycleUseCase(billingRepo));

        this.addControllers(billingCycleController);
    }

    public getApp(): Application {
        return this.app;
    }

    execute(): void {
        this.setupExpress();
        this.setupController();
    }
}

export default SetupServer