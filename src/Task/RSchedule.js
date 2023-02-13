import { BModel } from "../DB";
import schedule from "node-schedule";
import BuildingInfo from "../Data/BuildingInfo";

export default async function() {

    schedule.scheduleJob("*/1 * * * * *", async function () {
        await updateStored(3);
	});
    
}

const updateStored = async () => {
    const Bs = await BModel.find({
        buildType : "Resource"
    });
    
    Bs.forEach(async (element) => {
        const maxStore = BuildingInfo[element.name].Levels[element.lv - 1].StorageCapacity;

        if (maxStore > element.stored) {
            await BModel.updateOne({
                _id : element._id,
                active : true
            }, {
                $inc: {
                    stored : (maxStore / 3600)
                }
            })
        }
    });
};

