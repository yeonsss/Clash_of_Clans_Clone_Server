import mongoose from "mongoose";

const BSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    name: {
        type: String,
        required: true
    },
    buildType: {
        type: String,
        required: true,
        default: "Utility"
    },
    isFull: {
        type: Boolean,
        required: true,
        default: false
    },
    posX: {
        type: Number,
        default: 0,
        required: true
    },
    posY: {
        type: Number,
        default: 0,
        required: true
    },
    stored: {
        type: Number,
        default: 0,
        required: true
    },
    lv: {
        type: Number,
        required: true,
        default: 1
    },
    doneTime: {
        type: Date,
        default: 0,
        required: true
    },
}, {
    timestamps: true
});

const BModel = mongoose.model("B", BSchema);

export default BModel;