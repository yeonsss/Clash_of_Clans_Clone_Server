import MonsterInfo from "../../Data/MonsterInfo";
import { ArmyModel, TaskModel } from "../../DB";

class TaskController {
    static Create = async ({UserId, Name, Type}) => {
        try {
            let remainingTime = 0;

            const army = await ArmyModel.findOne({
                userId: UserId
            });

            if (Type == "Monster") {
                if (Name in MonsterInfo == false) {
                    throw new Error("not valid monster name. check ID.");
                }
                if (army.monsterProdMaxCount < 
                    army.monsterProdCurCount + MonsterInfo[Name].SummonCapacity) {
                    throw new Error("The queue is full.");
                }

                await ArmyModel.updateOne({
                    userId : UserId
                }, {
                    $inc: {
                        monsterProdCurCount: MonsterInfo[Name].SummonCapacity
                    }
                })
                remainingTime = MonsterInfo[Name].SpawnTime;
                
            }
            else if (Type == "Magic") {
                if (Name in MonsterInfo == false) {
                    throw new Error("not valid magic name. check ID.");
                }
                if (army.magicProdMaxCount <
                    army.magicProdCurCount + MagicInfo[Name].SummonCapacity) {
                    throw new Error("The queue is full.");
                }
                await ArmyModel.updateOne({
                    userId : UserId
                }, {
                    $inc : {
                        magicProdCurCount: MagicInfo[Name].SummonCapacity,
                    }
                })
                remainingTime = MagicInfo[Name].SpawnTime;
            }

            const result = await TaskModel.create({
                userId: UserId,
                name: Name,
                type : Type,
                remainingTime: remainingTime
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
            const tasks = await TaskModel.find({
                userId: UserId
            }).sort({
                "createdAt" : 1
            }).lean();

            if (tasks == null) {
                throw new Error("Get TaskList Fail");
            }

            const taskList = [];
            const date = Date.now();

            for(const t of tasks) {
                if (t.isStart == true) {
                    const diff = t.doneTime.getTime() - date;
                    if (diff > 0) {
                        taskList.push({...t, remainingTime : Math.floor(diff / 1000)})
                    }
                    else {
                        taskList.push({...t});
                    }
                }
                else {
                    taskList.push({...t})
                }
            }

            return {
                state: true,
                message: "Get TaskList Success",
                data: taskList
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

    static Delete = async({ UserId, TaskId }) => {
        try {
            const task = await TaskModel.findOne({
                userId : UserId,
                _id : TaskId
            })
            if (task == null) {
                throw new Error("invalid ID. Please check your ID.");
            }

            if (task.type == "Monster") {
                await ArmyModel.updateOne({
                    userId : UserId
                }, {
                    $inc : {
                        monsterProdCurCount : -1 * MonsterInfo[task.name].SummonCapacity
                    }
                    
                })
            }
            else if (task.type == "Magic") {
                await ArmyModel.updateOne({
                    userId : UserId
                }, {
                    $inc : {
                        magicProdCurCount : -1 * MagicInfo[task.name].SummonCapacity
                    }
                })
            }
            
            const result = await TaskModel.deleteOne({
                userId : UserId,
                _id : TaskId
            });
            if (result.deletedCount == 0) {
                throw new Error("delete task fail");
            }

            return {
                state: true,
                message: "delete Task Success",
            }
        } catch(e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    // 즉시 완료

    static Start = async({UserId, TaskId}) => {
        try {
            const workingTaskCount = await TaskModel.countDocuments({
                userId: UserId,
                isStart : true
            })
            if (workingTaskCount > 0) {
                throw new Error("An Task has already been started.")
            }

            const task = await TaskModel.findOne({
                userId : UserId,
                _id : TaskId
            });
            if (task == null) {
                throw new Error("taskId is not valid");
            }

            const army = await ArmyModel.findOne({
                userId : UserId
            });
            if (army == null) {
                throw new Error("userId is not valud");
            }

            if (task.type == "Monster") {
                if (army.monsterProductionMaxCount <= army.monsterProductionCurrentCount) {
                    throw new Error("You've reached the limit of monster summoning.")
                }
                
            }
            else if (task.type == "Magic") {
                if (army.magicProductionMaxCount <= army.magicProductionCurrentCount) {
                    throw new Error("You've reached the limit of magic summoning.")
                }
            }

            if (task.isStart == true) {
                throw new Error("task already start");
            }

            if (task.done == true) {
                throw new Error("task already complete");
            }

            const runningTime = task.remainingTime;
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