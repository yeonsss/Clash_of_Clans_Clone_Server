import { ArmyModel, TaskModel, UserModel } from "../DB";
import schedule from "node-schedule";
import MonsterInfo from "../Data/MonsterInfo";
import TaskController from "../Controller/user/TaskController";

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
            console.log(element.type + " " + element.name)
            const army = await ArmyModel.findOne({
                userId : element.userId
            });

            if (element.type == "Monster") {
                if (army.selectMonsterCount < (army.monsterProdMaxCount / 2)) {
                    await TaskModel.deleteOne({
                        _id : element._id
                    });

                    await ArmyModel.updateOne({
                        userId : element.userId
                    }, {
                        $inc: {
                            selectMonsterCount: MonsterInfo[element.name].SummonCapacity,
                            [`selectMonsterMap.${element.name}`]: 1,
                            [`monsterCountMap.${element.name}`]: 1,
                        }
                    })
                }
                else {
                    await ArmyModel.updateOne({
                        userId : element.userId
                    }, {
                        $inc: {
                            [`monsterCountMap.${element.name}`]: 1,
                        }
                    })
                }
            }
            else if (element.type == "Magic") {
                if (army.selectMagicCount < (army.magicProdMaxCount / 2)) {
                    await TaskModel.deleteOne({
                        _id : element._id
                    });

                    await ArmyModel.updateOne({
                        userId : element.userId
                    }, {
                        $inc: {
                            selectMagicCount: MagicInfo[element.name].SummonCapacity,
                            [`selectMagicMap.${element.name}`]: 1,
                            [`magicCountMap.${element.name}`]: 1,
                        }
                    })
                }
                else {
                    await ArmyModel.updateOne({
                        userId : element.userId
                    }, {
                        $inc: {
                            [`magicCountMap.${element.name}`]: 1,
                        }
                    })
                }
            }

            const remainingTask = await TaskModel.findOne({
                userId: element.userId,
                isStart: false,
                done: false
            }).sort({
                createdAt : 1
            });

            if (remainingTask != null) {
                TaskController.Start({ userId: element.userId, taskId: remainingTask._id });
            }

        }
    })
}