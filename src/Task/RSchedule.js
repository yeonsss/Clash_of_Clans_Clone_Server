import { BModel } from "../DB";
import schedule from "node-schedule";

export default async function() {

    schedule.scheduleJob("*/1 * * * * *", async function () {
        await updateStored(3);
	});
    
}

const updateStored = async (code) => {
    // TODO: 데이터 가져와서 체크
    const lvUpper = {
        1 : 200,
        2 : 400,
        3 : 600,
    }
    
    const Bs = await BModel.find({
        code : code
    });
    
    Bs.forEach(async (element) => {
        await BModel.updateOne({
            _id : element._id,
            active : true
        }, {
            $inc: {
                stored : (lvUpper[element.lv] / 3600)
            }
        })
    });
};

