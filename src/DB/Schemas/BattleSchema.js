import mongoose from "mongoose";

const BattleSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required: true
    },
    targetId: {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required: true
    },
    win: {
        type: Boolean,
        required: true,
        default: false
    }
});

const BattleModel = mongoose.model("Battle", BattleSchema);

export default BattleModel;
