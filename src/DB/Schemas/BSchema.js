import mongoose from "mongoose";

const BSchema = mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        required : true
    },
    active : {
        type : Boolean,
        required: true,
        default : false,
    },
    code : {
        type: Number,
        required: true
    },
    posX : {
        type: Number,
        default: 0,
        required: true
    },
    posY : {
        type: Number,
        default: 0,
        required: true
    },
    stored : {
        type: Number,
        default: 0,
        required: true
    },
    lv : {
        type: Number,
        required: true,
        default : 1
    },
    doneTime: {
        type : Date,
        default: 0,
        required: true
    },
}, {
    timestamps: true 
});

const BModel = mongoose.model("B", BSchema);

export default BModel;