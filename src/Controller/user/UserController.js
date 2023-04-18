import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import MonsterInfo from "../../Data/MonsterInfo";
import { ArmyModel, BModel, UserModel } from "../../DB";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

class UserController {

    static Login = async (id, password) => {
        try {
            const result = await UserModel.findOne({
                id: id
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
                userId: result._id
            }
        }
        catch (e) {
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

            const result = await UserModel.create({
                id: id,
                password: hashedPassword,
                userName: userName == "" || userName == null ? uuidv4() : userName,
            });

            await BModel.create({
                userId: result._id,
                name: "Hall",
                active: true,
            });

            const monsterList = Object.keys(MonsterInfo);
            const monsterCountMap = {};
            const monsterLevelMap = {};
            const magicCountMap = {};
            const magicLevelMap = {};
            const selectMonsterMap = {};
            const selectMagicMap = {};

            monsterList.forEach((element) => {
                monsterCountMap[`${element}`] = 0;
                monsterLevelMap[`${element}`] = 1;
                selectMonsterMap[`${element}`] = 0;
            });

            await ArmyModel.create({
                userId: result._id,
                magicCountMap: magicCountMap,
                magicLevelMap: magicLevelMap,
                monsterCountMap: monsterCountMap,
                monsterLevelMap: monsterLevelMap,
                magicProdMaxCount: 10,
                monsterProdMaxCount: 80,
                selectMonsterMap: selectMonsterMap,
                selectMagicMap: selectMagicMap
            })

            return {
                state: true,
                message: "Register Success"
            };
        }
        catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            };
        }
    }

    static GetRival = async ({ myId, targetId }) => {
        try {

            var filter = [myId];
            // if (ObjectId.isValid(targetId)) filter.push(targetId);

            const userList = await UserModel.find({
                _id: {
                    $nin: filter
                },
            }).limit(5);

            if (userList.length == 0) {
                throw new Error("no user");
            }

            const randomIdx = Math.floor(Math.random() * userList.length);
            const builds = await BModel.find({
                userId: userList[randomIdx]._id
            }).lean()

            const buildMap = {};
            const buildList = [];

            for (const b of builds) {
                if (b.name in buildMap == false) {
                    buildMap[b.name] = 1
                }
                else {
                    buildMap[b.name] += 1
                }

                if (b.active == false) {
                    continue;
                }
                buildList.push(b)
            }

            return {
                state: true,
                message: "find Rival",
                rivalInfo: {
                    userName: userList[randomIdx].userName,
                    userId: userList[randomIdx]._id,
                    credit: userList[randomIdx].credit,
                    tierPoint: userList[randomIdx].tierPoint,
                    buildMap: buildMap,
                    buildList: buildList
                }
            }
        }
        catch (e) {
            return {
                state: false,
                message: e.message,
                data: null
            }
        }
    }

    static UpdateUser = async (userId, data) => {
        try {
            await UserModel.updateOne({
                _id: userId
            }, data);

            return {
                state: true,
                message: "user update success"
            }
        }
        catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static FindUser = async (_id) => {
        try {
            const result = await UserModel.findOne({
                _id: _id
            });
            if (result == null) {
                throw new Error("user not found")
            }

            return {
                state: true,
                message: "find Success",
                data: result
            };
        }
        catch (e) {
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
                userId: userId
            });
            if (result == null) {
                throw new Error("user not found")
            }

            return {
                state: true,
                message: "find Success",
                data: result
            };
        }
        catch (e) {
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
                _id: userId
            })

            if (result == null) {
                throw new Error("user not found")
            }

            const myBuild = await BModel.find({
                userId: userId
            }).lean()

            const date = Date.now();

            const buildMap = {};
            const buildList = [];

            for (const b of myBuild) {
                if (b.name in buildMap == false) {
                    buildMap[b.name] = 1
                }
                else {
                    buildMap[b.name] += 1
                }

                if (b.active == false) {
                    const diff = b.doneTime.getTime() - date;
                    if (diff < 0) {
                        buildList.push({ ...b, stored: parseInt(b.stored), remainingTime: 0, active: true });
                    }
                    else {
                        buildList.push({ ...b, stored: parseInt(b.stored), remainingTime: Math.floor(diff / 1000) })
                    }
                }
                else {
                    buildList.push({ ...b, stored: parseInt(b.stored), remainingTime: 0 })
                }
            }

            const responseData = {
                name: result.userName,
                credit: result.credit,
                tierPoint: result.tierPoint,
                lv: result.lv,
                hallLv: result.hallLv,
                buildMap: buildMap,
                buildList: buildList
            }

            return {
                state: true,
                message: "find Success",
                data: responseData
            };
        }
        catch (e) {
            return {
                state: false,
                message: e.message,
                data: null
            };
        }
    }
}

export { UserController }