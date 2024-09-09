import { Sequelize } from "sequelize";
import { userModel } from "./userModel.js";


const databaseURI = 'postgres://postgres:abc@localhost:5432/userdirectory';

export let database = {};

const sequelize = new Sequelize(databaseURI, {
    dialect: "postgres",
});
database.Sequelize = Sequelize;
database.sequelize = sequelize;
database.user = userModel(sequelize);



const testDbConnection = async () => {
    try{
        await sequelize.authenticate();
        console.log('connected with databas');
    }catch(err){
        console.log('unable to connect with database', err);
    }
}

testDbConnection();