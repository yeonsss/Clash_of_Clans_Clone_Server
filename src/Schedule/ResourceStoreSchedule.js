import { BModel } from "../DB";
import schedule from "node-schedule";
import BuildingInfo from "../Data/BuildingInfo";
import FindClientSocket from "../utils/FindClientSocket";

export default async function () {

    schedule.scheduleJob("*/1 * * * * *", async function () {
        await updateStored(3);
    });

}

const updateStored = async () => {
    const Bs = await BModel.find({
        buildType: "Resource"
    });

    Bs.forEach(async (element) => {
        bInfo = BuildingInfo[element.name].Levels[element.lv - 1];
        const maxStore = bInfo.MaxCapacity;
        const OutputPerHour = bInfo.OutputPerHour;

        if (maxStore > element.stored) {

            if (element.stored + (OutputPerHour / 3600) >= maxStore) {
                const socket = await FindClientSocket(element.userId);
                if (socket != null) {
                    socket.emit('GET_BUILD_STORAGE', {
                        state: true,
                        message: "GET_BUILD_STORAGE",
                        buildId: element._id,
                        stored: element.stored,
                        isFull: element.isFull
                    })
                }
                await BModel.updateOne({
                    _id: element._id
                }, {
                    isFull: true,
                    $inc: {
                        stored: (OutputPerHour / 3600)
                    }
                })
            }
            else {
                await BModel.updateOne({
                    _id: element._id
                }, {
                    $inc: {
                        stored: (OutputPerHour / 3600)
                    }
                })
            }
        }
    });
};

