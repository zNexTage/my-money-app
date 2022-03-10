import ISetupLoader from "./ISetupLoader";

class Loader {
    constructor(
        private configurations: Array<ISetupLoader>
    ) { }

    addConfiguration(configuration: ISetupLoader) {
        this.configurations.push(configuration);
    }

    run() {
        for (const config of this.configurations) { 
            config.execute();
        }
    }
}

export default Loader;