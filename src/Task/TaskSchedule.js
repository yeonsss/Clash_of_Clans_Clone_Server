import { TaskModel, UserModel } from "../DB";
import schedule from "node-schedule";

export default async function() {
    schedule.scheduleJob("*/1 * * * * *", async function () {
        await updateTaskDone();
	});
}

const updateTaskDone = async() => {
    const tasks = await TaskModel.find({
        isStart : true
    })

    const date = new Date();
    tasks.forEach( async (element) => {
        if (element.doneTime.getTime() <= date.getTime()) {
            await TaskModel.updateOne({
                _id : element._id
            }, {
                isStart : false,
                done: true
            })

            await UserModel.updateOne({
                _id : element.userId
            }, {
                $inc: {
                    [`army.${element.code}`]: 1,
                }
            })
        }
    })
}