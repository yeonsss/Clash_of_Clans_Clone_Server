import BuildingInfo from "../../Data/BuildingInfo";
import { BModel, UserModel } from "../../DB";

class BController {
    static GetInfo = async (rbId) => {
        try {
            const result = await BModel.findOne({
                _id : rbId
            });

            if (result == null) {
                throw new Error("Get Build Info fail...");
            }

            return {
                state : true,
                message : "GetInfo success",
                buildId : result._id,
                name: result.name,
                active: result.active,
                stored : result.stored,
                max : result.max,
                isFull: result.stored >= result.max ? true : false
            }
        }
        catch(e) {
            return {
                state : false,
                message : e.message,
                buildId : "",
                stored : 0,
                max : 0,
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

    static GetBuilds = async(UserId) => {
        try {
            const buildList = await BModel.find({
                userId : UserId,
                active : true
            })

            const result = [];
            for(const b of buildList) {
                result.push({
                    name : b.name,
                    Lv : b.lv,
                    PosX : b.posX,
                    PosY : b.posY
                })
            }

            return {
                state : true,
                message : "getBuilds Success",
                builds : result
            }

        } catch(e) {
            return {
                state : false,
                message : e.message,
                builds : null,
            }
        }
    }

    static Create = async ({UserId, Name, PosX, PosY, ClientTime}) => {
        try {
            if (Name in BuildingInfo == false) {
                throw new Error("BuildName error!! check name.");
            }

            const buildCost = BuildingInfo[Name].BuildCost;

            const user = await UserModel.findOne({
                _id : UserId
            })

            if (user == null) {
                throw new Error("not found user");
            }

            if (user.credit - buildCost < 0) {
                throw new Error("not enough credit");
            }

            await UserModel.updateOne({
                _id : UserId
            }, {
                $inc : {
                    credit : -1 * buildCost
                }
            })

            // 완료까지 걸리는 시간 (초)
            const runningTime = BuildingInfo[Name].BuildTime;
            const date = new Date();

            date.setMilliseconds(0);
            console.log("datetime : ", date)

            // const ctime = new Date(ClientTime);
            const ctime = ClientTime;
            ctime.setMilliseconds(0);
            console.log("clienttime : ", ctime)
            
            console.log("difftime : ", date - ctime)
            const doneTime = new Date(date - (date - ctime));

            console.log("time : ", doneTime)
            
            doneTime.setSeconds(doneTime.getSeconds() + runningTime)

            console.log("resultTime : ", doneTime)

            const result = await BModel.create({
                userId : UserId,
                name : Name,
                buildType : BuildingInfo[Name].BuildType,
                posX : PosX,
                posY : PosY,
                doneTime: doneTime
            });

            return {
                state : true,
                message : "Create Success",
                buildId : result._id
            }
        }
        catch(e) {
            console.log(e.stack)
            return {
                state : false,
                message : e.message,
                buildId : null,
            }
        }
    }

    static Upgrade = async({ UserId, BuildId }) => {
        try {
            const build = await BModel.findOne({
                userId: UserId,
                _id : BuildId
            });
            if (build == null) throw new Error("invalid id.");

            const user = await UserModel.findOne({
                _id : UserId,
            })
            if (user == null) throw new Error("invalid user id.");

            const cost = BuildingInfo[build.name].Levels[build.lv - 1].UpgradeCost;
            if (user.credit - cost < 0) {
                throw new Error("Not enough credit.");
            }
            
            const result = await BModel.updateOne({
                userId: UserId,
                _id : BuildId
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
                    _id: UserId
                }, {
                    hallLv: result.lv,  
                    $inc : {
                        credit : -1 * cost
                    }
                })
            }
            else {
                await UserModel.updateOne({
                    _id : UserId
                }, {
                    $inc : {
                        credit : -1 * cost
                    }
                });
            }

            return {
                state: true,
                message: "upgrade success",
            }

        } catch(e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static GetResource = async(UserId) => {
        try {
            const builds = await BModel.find({
                userId : UserId,
                buildType: "Resource"
            })

            let creditMount = 0;

            for(const b of builds) {
                if (b.stored < 1) continue;

                creditMount += b.stored
                await BModel.updateOne({
                    _id : b._id
                }, {
                    stored: 0
                })
            }

            const result = await UserModel.findOneAndUpdate({
                _id : UserId
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

        } catch(e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static MovePos = async({ UserId, BuildId, PosX, PosY }) => {
        try {
            const result = await BModel.updateOne({
                _id : BuildId,
                userId: UserId
            }, {
                posX : PosX,
                posY : PosY,
            })

            if (result == null) {
                throw new Error("Update Pos Fail");
            }

            return {
                state : true,
                message : "Update Pos Success",
            }

        } catch(e) {
            console.log(e.stack)
            return {
                state : false,
                message : e.message,
            }
        }
    }
}

export default BController;