import { ArmyModel, TaskModel, UserModel } from "../DB";
import schedule from "node-schedule";
import MonsterInfo from "../Data/MonsterInfo";

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
            await TaskModel.deleteOne({
                _id : element._id
            });

            if (element.type == "Monster") {

                await ArmyModel.updateOne({
                    userId : element.userId
                }, {
                    $inc: {
                        [`monsterCountMap.${element.name}`]: 1,
                    }
                })
            }
            else if (element.type == "Magic") {
                await ArmyModel.updateOne({
                    _id : element.userId
                }, {
                    $inc: {
                        [`magicCountMap.${element.name}`]: 1,
                    }
                })
            }
        }
    })
}