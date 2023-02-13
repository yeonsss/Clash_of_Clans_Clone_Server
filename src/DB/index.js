import mongoose from "mongoose";
import BModel from "./Schemas/BSchema";
import UserModel from "./Schemas/UserSchema";
import TaskModel from "./Schemas/TaskSchema";
import ArmyModel from "./Schemas/ArmySchema";

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("The connection was successful.");
    })
    .catch(console.error);


export { UserModel, BModel, TaskModel, ArmyModel };