import mongoose from 'mongoose';
import ISetupLoader from '../../Loader/ISetupLoader';

class SetupMongoose implements ISetupLoader {
    async execute() {
        await mongoose.connect('mongodb://localhost/mymoney');   
    }
}

export default SetupMongoose;