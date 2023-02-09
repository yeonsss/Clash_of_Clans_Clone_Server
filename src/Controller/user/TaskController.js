import { TaskModel } from "../../DB";

class TaskController {
    static Create = async ({UserId, Code}) => {
        try {
            // TODO: Code 체크
            const result = await TaskModel.create({
                userId: UserId,
                code: Code
            });

            if (result == null) {
                throw new Error("Create Task fail");
            }

            return {
                state: true,
                message: "Create Task Success",
                taskId: result._id
            }

        } catch(e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static GetTaskList = async({UserId}) => {
        try {
            const result = await TaskModel.find({
                userId: UserId
            });

            if (result == null) {
                throw new Error("Get TaskList Fail");
            }

            return {
                state: true,
                message: "Get TaskList Success",
                data: result
            }

        } catch(e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static GetTask = async({UserId, TaskId}) => {
        try {
            const result = await TaskModel.findOne({
                _id : TaskId,
                userId: UserId
            });

            if (result == null) {
                throw new Error("Get Task Fail");
            }

            return {
                state: true,
                message: "Get Task Success",
                data: result
            }

        } catch(e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static Start = async({UserId, TaskId}) => {
        try {
            const task = await TaskModel.findOne({
                userId : UserId,
                _id : TaskId
            });

            if (task.isStart == true) {
                throw new Error("task already start");
            }

            if (task.done == true) {
                throw new Error("task already complete");
            }

            const runningTime = 60 * 5;
            const doneTime = new Date();
            doneTime.setMilliseconds(0);

            console.log("time : ", doneTime)
            
            doneTime.setSeconds(doneTime.getSeconds() + runningTime)

            console.log("resultTime : ", doneTime)

            await TaskModel.updateOne({
                userId: UserId,
                _id : TaskId
            }, {
                doneTime: doneTime,
                isStart: true
            }, {
                returnDocument: "after"
            });

            if (task == null) {
                throw new Error("Start Task Fail");
            }

            return {
                state: true,
                message: "Start Task Success",
                remainingTime: runningTime
            }
            
        } catch(e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message,
            }
        }
    }
}

export default TaskController;