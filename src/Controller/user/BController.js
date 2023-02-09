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
                code: result.code,
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

    static GetMyBuilds = async(UserId) => {
        try {
            const buildList = await BModel.find({
                userId: UserId
            })

            if (buildList.length == 0) {
                throw new Error("Get My Builds Fail");
            }

            

            return {
                state: true,
                message: "Gat My Builds Success",
                data : buildList
            }

        } catch(e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message,
            }
        }
    }

    static GetBuilds = async(UserId) => {
        try {
            const buildList = await BModel.find({
                userId : UserId,
                active : true
            })

            const result = [];
            for(const b of buildList) {
                result.push({
                    Code : b.code,
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

    static Create = async ({UserId, Code, PosX, PosY, ClientTime}) => {
        try {
            //TODO: 총 용량 계산
            // 완료까지 걸리는 시간 (초)
            const runningTime = 60 * 5;
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
                code : Code,
                posX : PosX,
                posY : PosY,
                doneTime: doneTime
            });

            console.log(result);

            const result2 = await UserModel.findOneAndUpdate({
                _id : UserId
            }, {
                $inc: {
                    [`build.${Code}`]: 1,
                }
            },{
                returnDocument: "after"
            })

            console.log(result2);

            if (result == null) {
                throw new Error("Create Fail");
            }

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
            //TODO: 크래딧 계산 로직
            const result = await BModel.findOneAndUpdate({
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

            console.log(result)

            if (result.code == 4) {
                await UserModel.updateOne({
                    _id: UserId
                }, {
                    hallLv: result.lv
                })
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
                code: 3
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