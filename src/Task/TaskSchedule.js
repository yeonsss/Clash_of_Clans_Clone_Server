import { ArmyModel, TaskModel, UserModel } from "../DB";
import schedule from "node-schedule";
import FindClientSocket from "../utils/FindClientSocket";
import MonsterInfo from "../Data/MonsterInfo";
import TaskController from "../Controller/user/TaskController";
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')

export default async function () {
    const scheduler = new ToadScheduler()

    const task1 = new Task('TaskStartForServerOn', TaskStartForServerOn);
    const job1 = new SimpleIntervalJob({ seconds: 1, }, task1)

    const task2 = new Task('updateTaskDone', updateTaskDone);
    const job2 = new SimpleIntervalJob({ seconds: 1, }, task2)

    const task3 = new Task('FillSelectMap', FillSelectMap);
    const job3 = new SimpleIntervalJob({ seconds: 1, }, task3)

    scheduler.addSimpleIntervalJob(job1);
    scheduler.addSimpleIntervalJob(job2);
    scheduler.addSimpleIntervalJob(job3);
}

const FillSelectMap = async () => {
    const armies = await ArmyModel.find();

    armies.forEach(async (element) => {
        if (element.selectMonsterCount < (element.monsterProdMaxCount / 2)) {
            const tasks = await TaskModel.find({
                userId: element.userId,
                type: "Monster",
                isStart: false,
                done: true,
            })

            for (const t of tasks) {
                const capacity = MonsterInfo[t.name].SummonCapacity;
                if (element.selectMonsterCount + capacity <= (element.monsterProdMaxCount / 2)) {

                    await TaskModel.deleteOne({
                        _id: t._id
                    });

                    await ArmyModel.updateOne({
                        userId: t.userId
                    }, {
                        $inc: {
                            selectMonsterCount: capacity,
                            [`selectMonsterMap.${t.name}`]: 1,
                            [`monsterCountMap.${t.name}`]: 1,
                        }
                    })
                }

                const socket = await FindClientSocket(element.userId);

                if (socket != null) {
                    socket.emit('GET_TASK_COMPLETE', {
                        state: true,
                        message: "task complete",
                        taskId: t._id,
                        name: t.name,
                        type: t.type
                    })
                }
            }

        }

        if (element.selectMagicCount) {
            const tasks = await TaskModel.find({
                type: "Magic",
                isStart: false,
                done: true,
            })

            for (const t of tasks) {
                const capacity = MagicInfo[t.name].SummonCapacity;
                if (element.selectMagicCount + capacity <= (element.magicProdMaxCount / 2)) {

                    await TaskModel.deleteOne({
                        _id: element._id
                    });

                    await ArmyModel.updateOne({
                        userId: element.userId
                    }, {
                        $inc: {
                            selectMagicCount: capacity,
                            [`selectMagicMap.${element.name}`]: 1,
                            [`magicCountMap.${element.name}`]: 1,
                        }
                    })
                }

                const socket = await FindClientSocket(element.userId);

                if (socket != null) {
                    socket.emit('GET_TASK_COMPLETE', {
                        state: true,
                        message: "task complete",
                        taskId: t._id,
                        name: t.name,
                        type: t.type
                    })
                }
            }
        }
    })
}

const TaskStartForServerOn = async () => {
    const users = await UserModel.find();

    users.forEach(async (element) => {
        const id = element._id;
        const startTaskCount = await TaskModel.countDocuments({
            userId: id,
            isStart: true
        })

        if (startTaskCount > 0) return;

        const task = await TaskModel.findOne({
            userId: id,
            isStart: false,
            done: false
        }).sort({
            createdAt: 1
        });

        if (task == null) return;

        await TaskController.Start({ userId: id, taskId: task._id });

        const socket = await FindClientSocket(id);

        console.log("socket : ", socket);
        console.log("task start");
        if (socket != null) {
            socket.emit('GET_TASK_START', {
                state: true,
                message: "task start",
                taskId: task._id,
                name: task.name,
            })
        }
    })

}

const updateTaskDone = async () => {
    const tasks = await TaskModel.find({
        isStart: true
    })

    const date = new Date();
    tasks.forEach(async (element) => {
        if (element.doneTime.getTime() <= date.getTime()) {
            await TaskModel.updateOne({
                _id: element._id
            }, {
                isStart: false,
                done: true
            });
        }
    })
}