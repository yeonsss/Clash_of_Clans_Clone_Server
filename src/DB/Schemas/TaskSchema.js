import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "USER",
        required : true
    },
    code: {
        type: Number,
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
})

const TaskModel = mongoose.model("TASK", TaskSchema);
export default TaskModel;