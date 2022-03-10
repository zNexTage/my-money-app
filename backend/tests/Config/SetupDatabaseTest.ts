import ISetupLoader from "../../src/Loader/ISetupLoader";

class SetupDatabaseTest {
    constructor(
        private setupDatabase: ISetupLoader
    ) { }

    async execute() {
        await this.setupDatabase.execute();
    }

    getConnection() {
        return this.setupDatabase;
    }
}

export default SetupDatabaseTest;