import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            require : true,
        },
        password: {
            type: String,
            required: true
        },
        credit: {
            type: Number,
            default: 1000,
            required: true
        },
        tierPoint : {
            type: Number,
            default: 0,
            required: true
        },
        lv: {
            type: Number,
            default: 1,
            required: true
        },
        hallLv: {
            type: Number,
            default: 1,
            required: true
        },
        armyCapacity: {
            type: Number,
            default: 0,
            required: true
        },
        army: {
            type: Map,
            of : Number,
            required: true
        },
        build: {
            type: Map,
            of : Number,
            required: true
        }
    },
    { 
        timestamps: true 
    }
)

const UserModel = mongoose.model("USER", UserSchema);

export default UserModel;