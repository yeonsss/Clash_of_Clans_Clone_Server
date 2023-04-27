import { BModel } from "../DB";
import schedule from "node-schedule";

export default async function() {

    schedule.scheduleJob("*/1 * * * * *", async function () {
        await updateBuildActive();
	});

    // schedule.scheduleJob("*/1 * * * * *", async function () {
    //     await updateStartState();
	// });
}

// const updateStartState = async () => {
//     const users = await UserModel.find();

//     // 완료까지 걸리는 시간 (초)
//     const doneTime = 10;

//     users.forEach(async (element) => {
//         const task = await TaskModel.findOne({
//             userId : element._id,
//             isStart : false,
//             done : false
//         });

//         const date = new Date();
//         date.setMilliseconds(0);
//         date.setSeconds(date.getSeconds() + doneTime)

//         if (task != null) {
//             await TaskModel.updateOne({
//                 _id : task._id
//             }, {
//                 isStart: true,
//                 doneTime: doneTime,
//                 time: date
//             })
//         }
        
//     });
// }


const updateBuildActive = async () => {
    const build = await BModel.find({
        active : false
    });
    const date = new Date();
    build.forEach(async (element) => {
        if (element.doneTime.getTime() <= date.getTime()) {
            await BModel.updateOne({
                _id : element._id
            }, {
                active: true
            })
        }
        
    });
};

