import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { BModel, UserModel } from "../../DB";

class UserController {

    static Login = async (id, password) => {
        try {
            const result = await UserModel.findOne({
                id : id
            });
            const correctPasswordHash = result?.password

            const isPasswordCorrect = await bcrypt.compare(
                password,
                correctPasswordHash
            );

            if (isPasswordCorrect == false) {
                throw new Error("Login fail")
            }

            return {
                state: true,
                message: "Login Success",
                userId : result._id
            }        
        }
        catch(e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }  
        }
    }

    static Register = async (id, password, userName) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const armyMap = {
                1: 0,
                2: 0
            }

            const buildMap = {
                1: 0,
                2: 0,
                3: 0,
                4: 1
            }

            // armyMap[3] = 0;

            const result = await UserModel.create({
                id : id,
                password: hashedPassword,
                userName : userName == "" || userName == null ? uuidv4() : userName,
                army: armyMap,
                build: buildMap
            });

            await BModel.create({
                userId: result._id,
                code: 4,
                lv: 1,
                active: true,
            });

            return {
                state: true,
                message: "Register Success"
            };
        }
        catch(e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            };
        }
    }

    static GetUsers = async () => {
        try {
            const userList = await UserModel.find({}).limit(5);
            if (userList.length == 0) {
                throw new Error("no user");
            }

            const result = [];
            for(const u of userList) {
                result.push({
                    UserName : u.userName,
                    UserId: u._id,
                    TierPoint : u.tierPoint,
                })
            }

            return {
                state : true,
                message : "find userlist",
                data : result
            }
        }
        catch(e) {
            return {
                state : false,
                message : e.message,
                data : null
            }
        }
    }

    static UpdateUser = async (userId, data) => {
        try {
            await UserModel.updateOne({
                _id : userId
            }, data);

            return {
                state : true,
                message : "user update success"
            }
        }
        catch(e) {
            return {
                state : false,
                message : e.message
            }
        }
    }

    static UpdateArmy = async (userId, {Code, Count}) => {
        try {
            //TODO: 총 용량도 계산.
            const result = await UserModel.updateOne({
                _id : userId
            }, {
                $inc: {
                    [`army.${Code}`]: Count,
                }
            });

            if (result == null) {
                throw new Error("update fail")
            }

            return {
                state: true,
                message: "my data update Success",
            }
        }
        catch(e) {
            return {
                state: false,
                message: e.message,
            }
        }
    }

    static FindUser = async (_id) => {
        try {
            const result = await UserModel.findOne({
                _id : _id
            });
            if (result == null) {
                throw new Error("user not found")
            }

            return {
                state: true,
                message: "find Success",
                data : result
            };
        }
        catch(e) {
            return {
                state: false,
                message: e.message,
                data: null
            };
        }
    }

    static FindUserById = async (userId) => {
        try {
            const result = await UserModel.findOne({
                userId : userId
            });
            if (result == null) {
                throw new Error("user not found")
            }

            return {
                state: true,
                message: "find Success",
                data : result
            };
        }
        catch(e) {
            return {
                state: false,
                message: e.message,
                data: null
            };
        }
    }

    static GetMyData = async (userId) => {
        try {
            const result = await UserModel.findOne({
                _id : userId
            })

            if (result == null) {
                throw new Error("user not found")
            }

            const myBuild = await BModel.find({
                userId : userId
            }).lean()

            const date = Date.now();    

            const buildList = [];

            for(const b of myBuild) {
                if (b.active == false) {
                    const diff = b.doneTime.getTime() - date;
                    if (diff < 0) {
                        buildList.push({...b, stored: parseInt(b.stored), remainingTime: 0, active: true});
                    }
                    else {
                        buildList.push({...b, stored: parseInt(b.stored), remainingTime : Math.floor(diff / 1000)})
                    }
                }
                else {
                    buildList.push({...b, stored: parseInt(b.stored), remainingTime: 0})
                }
            }

            const responseData = {
                Name: result.userName,
                Credit: result.credit,
                TierPoint: result.TierPoint,
                Lv: result.lv,
                HallLv: result.hallLv,
                ArmyCapacity: result.armyCapacity,
                Army: result.army,
                Build: result.build,
                BuildList: buildList
            }

            return {
                state: true,
                message: "find Success",
                data : responseData
            };
        }
        catch(e) {
            return {
                state: false,
                message: e.message,
                data: null
            };
        }
    }
}

export { UserController }