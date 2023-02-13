import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required : true
    },
    type : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    remainingTime: {
        type: Number,
        default: 0,
        required: true
    },
    isStart : {
        type: Boolean,
        default: false,
        required: true,
    },
    doneTime : {
        type : Date,
        default: 0,
        required: true
    },
    done : {
        type : Boolean,
        default: false,
        required: true
    }
}, { 
    timestamps: true 
})

const TaskModel = mongoose.model("TASK", TaskSchema);
export default TaskModel;