import BuildingInfo from "../../Data/BuildingInfo";
import { BModel, UserModel } from "../../DB";

class BController {
    static GetInfo = async (rbId) => {
        try {
            const result = await BModel.findOne({
                _id: rbId
            });

            if (result == null) {
                throw new Error("Get Build Info fail...");
            }

            return {
                state: true,
                message: "GetInfo success",
                buildId: result._id,
                name: result.name,
                active: result.active,
                stored: result.stored,
                max: result.max,
                isFull: result.stored >= result.max ? true : false
            }
        }
        catch (e) {
            return {
                state: false,
                message: e.message,
                buildId: "",
                stored: 0,
                max: 0,
                isFull: false
            }
        }
    }

    // static GetMyBuilds = async(UserId) => {
    //     try {
    //         const buildList = await BModel.find({
    //             userId: UserId
    //         })

    //         if (buildList.length == 0) {
    //             throw new Error("Get My Builds Fail");
    //         }

    //         return {
    //             state: true,
    //             message: "Gat My Builds Success",
    //             data : buildList
    //         }

    //     } catch(e) {
    //         console.log(e.stack)
    //         return {
    //             state: false,
    //             message: e.message,
    //         }
    //     }
    // }

    static GetBuilds = async (userId) => {
        try {
            const buildList = await BModel.find({
                userId: userId,
                active: true
            })

            const result = [];
            for (const b of buildList) {
                result.push({
                    name: b.name,
                    Lv: b.lv,
                    PosX: b.posX,
                    PosY: b.posY
                })
            }

            return {
                state: true,
                message: "getBuilds Success",
                builds: result
            }

        } catch (e) {
            return {
                state: false,
                message: e.message,
                builds: null,
            }
        }
    }

    static Create = async ({ userId, name, posX, posY, clientTime }) => {
        try {
            console.log(clientTime)
            if (name in BuildingInfo == false) {
                throw new Error("BuildName error!! check name.");
            }

            const buildCost = BuildingInfo[name].BuildCost;

            const user = await UserModel.findOne({
                _id: userId
            })

            if (user == null) {
                throw new Error("not found user");
            }

            if (user.credit - buildCost < 0) {
                throw new Error("not enough credit");
            }

            await UserModel.updateOne({
                _id: userId
            }, {
                $inc: {
                    credit: -1 * buildCost
                }
            })

            // 완료까지 걸리는 시간 (초)
            const runningTime = BuildingInfo[name].BuildTime;
            const date = new Date();

            date.setMilliseconds(0);
            console.log("datetime : ", date)

            const ctime = new Date(clientTime);
            // const ctime = clientTime;
            ctime.setMilliseconds(0);
            console.log("clienttime : ", ctime)

            console.log("difftime : ", date - ctime)
            const doneTime = new Date(date - (date - ctime));

            console.log("time : ", doneTime)

            doneTime.setSeconds(doneTime.getSeconds() + runningTime)

            console.log("resultTime : ", doneTime)

            const result = await BModel.create({
                userId: userId,
                name: name,
                buildType: BuildingInfo[name].BuildType,
                posX: posX,
                posY: posY,
                doneTime: doneTime
            });

            return {
                state: true,
                message: "Create Success",
                buildId: result._id
            }
        }
        catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message,
                buildId: null,
            }
        }
    }

    static Upgrade = async ({ userId, buildId }) => {
        try {
            const build = await BModel.findOne({
                userId: userId,
                _id: buildId
            });
            if (build == null) throw new Error("invalid id.");

            const user = await UserModel.findOne({
                _id: userId,
            })
            if (user == null) throw new Error("invalid user id.");

            const cost = BuildingInfo[build.name].Levels[build.lv - 1].UpgradeCost;
            if (user.credit - cost < 0) {
                throw new Error("Not enough credit.");
            }

            const result = await BModel.updateOne({
                userId: userId,
                _id: buildId
            }, {
                $inc: {
                    lv: 1
                }
            }, {
                returnDocument: "after"
            })

            if (result == null) {
                throw new Error("upgrade fail");
            }

            if (result.name == "Hall") {
                await UserModel.updateOne({
                    _id: userId
                }, {
                    hallLv: result.lv,
                    $inc: {
                        credit: -1 * cost
                    }
                })
            }
            else {
                await UserModel.updateOne({
                    _id: userId
                }, {
                    $inc: {
                        credit: -1 * cost
                    }
                });
            }

            return {
                state: true,
                message: "upgrade success",
            }

        } catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static GetResource = async (userId) => {
        try {
            const builds = await BModel.find({
                userId: userId,
                buildType: "Resource"
            })

            let creditMount = 0;

            for (const b of builds) {
                if (b.stored < 1) continue;

                creditMount += b.stored
                await BModel.updateOne({
                    _id: b._id
                }, {
                    stored: 0
                })
            }

            const result = await UserModel.findOneAndUpdate({
                _id: userId
            }, {
                $inc: {
                    credit: creditMount
                }
            }, {
                returnDocument: "after"
            })

            if (result == null) {
                throw new Error("Get Resource fail");
            }

            return {
                state: true,
                message: "Get Resource success",
                credit: parseInt(result.credit)
            }

        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static MovePos = async ({ userId, buildId, posX, posY }) => {
        try {
            const result = await BModel.updateOne({
                _id: buildId,
                userId: userId
            }, {
                posX: posX,
                posY: posY,
            })

            if (result == null) {
                throw new Error("Update Pos Fail");
            }

            return {
                state: true,
                message: "Update Pos Success",
            }

        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message,
            }
        }
    }
}

export default BController;