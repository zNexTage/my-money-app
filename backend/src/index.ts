import Server from "./Config/Server";
import Loader from "./Loader";
import Database from "./Config/Database/Mongoose";

const server = new Server();
const database = new Database();

const loader = new Loader([
    server,
    database
]);


loader.run();
