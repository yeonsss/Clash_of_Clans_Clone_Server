import mongoose from "mongoose";
import BModel from "./Schemas/BSchema";
import UserModel from "./Schemas/UserSchema";
import TaskModel from "./Schemas/TaskSchema";
import ArmyModel from "./Schemas/ArmySchema";
import MatchSchema from "./Schemas/MatchSchema";

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        try {
            mongoose.connection.db.collection('sessions').deleteMany({});    
            console.log("session clear success..");
        }
        catch(e) {
            console.log("session clear fail..");
        }
        
        console.log("The connection was successful.");
    })
    .catch(console.error);



export { UserModel, BModel, TaskModel, ArmyModel, mongoose, MatchSchema };