import MonsterInfo from "../../Data/MonsterInfo";
import { ArmyModel, UserModel } from "../../DB"

class ArmyController {
    static GetMyArmy = async ({ userId }) => {
        try {
            const result = await ArmyModel.findOne({
                userId
            });
            if (result == null) {
                throw new Error("User ID is invalid.")
            }

            return {
                state: true,
                message: "GetMyArmy success",
                armyInfo: result
            }
        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static SelectArmyCheck = async ({ userId }) => {
        try {
            const result = await ArmyModel.findOne({
                userId
            });
            if (result == null) throw new Error("User ID is invalid.")

            let check = false;
            if (result.selectMonsterCount > 0) check = true;

            return {
                state: true,
                message: "select army check",
                possible: check
            }

        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static GetMySelectArmy = async ({ userId }) => {
        try {
            const result = await ArmyModel.findOne({
                userId
            });
            if (result == null) {
                throw new Error("User ID is invalid.")
            }

            return {
                state: true,
                message: "GetMySelectArmy success",
                selectInfo: {
                    monsterLevelMap: result.monsterLevelMap,
                    magicLevelMap: result.magicLevelMap,
                    selectMagicMap: result.selectMagicMap,
                    selectMonsterMap: result.selectMonsterMap
                }
            }
        } catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static UpgradeArmy = async ({ userId, name, type }) => {
        try {
            let cost = 0;
            const army = await ArmyModel.findOne({ userId: userId });
            if (army == null) throw new Error("army not found");

            if (type == "Monster") {
                const currentLv = army.monsterLevelMap.get(name);
                cost = MonsterInfo[name].Levels[currentLv].LevelUpCost
            }
            else if (type == "Magic") {
                const currentLv = army.magicLevelMap.get(name);
                cost = MagicInfo[name].Levels[currentLv].LevelUpCost
            }

            const user = await UserModel.findOne({
                _id: userId
            });
            if (user == null) throw new Error("user not found");
            if (user.credit - cost < 0) {
                throw new Error("credit not enough");
            }

            await UserModel.updateOne({
                userId
            }, {
                $inc: {
                    credit: -1 * cost
                }
            })

            if (type == "Monster") {
                await ArmyModel.updateOne({
                    userId
                }, {
                    $inc: {
                        [`monsterLevelMap.${name}`]: 1,
                    }
                })
            }
            else if (type == "Magic") {
                await ArmyModel.updateOne({
                    userId
                }, {
                    $inc: {
                        [`magicLevelMap.${name}`]: 1,
                    }
                })
            }

            return {
                state: true,
                message: "level up complete"
            }

        } catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static DeleteSelectAll = async ({ userId, type }) => {
        try {
            const army = await ArmyModel.findOne({ userId });
            if (army == null) {
                throw new Error("user id is invalid");
            }

            if (type == "Monster") {
                const monsterMap = army.selectMonsterMap;
                const monsterProdMap = army.monsterCountMap;

                for (const name of monsterMap.keys()) {
                    monsterMap.set(name, 0)
                    monsterProdMap.set(name, 0);
                }

                await ArmyModel.updateOne({
                    userId
                }, {
                    monsterProdCurCount: 0,
                    monsterCountMap: monsterProdMap,
                    selectMonsterCount: 0,
                    selectMonsterMap: monsterMap
                })
            }
            else if (type == "Magic") {
                const magicMap = army.selectMagicMap;
                const magicProdMap = army.magicCountMap;

                for (const name of magicMap.keys()) {
                    magicMap.set(name, 0)
                    magicProdMap.set(name, 0)
                }

                await ArmyModel.updateOne({
                    userId
                }, {
                    magicProdCurCount: 0,
                    magicCountMap: magicProdMap,
                    selectMagicCount: 0,
                    selectMagicMap: magicMap
                })
            }
            else {
                throw new Error("type error!")
            }

            return {
                state: true,
                message: `DeleteArmy ${type} success`
            }

        } catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }

    static DeleteSelect = async ({ userId, name, type }) => {
        try {
            const army = await ArmyModel.findOne({ userId });
            if (army == null) {
                throw new Error("user id is invalid");
            }

            if (type == "Monster") {
                if (army.selectMonsterMap.get(name) < 1) {
                    throw new Error("The number of these monsters is less than 1.")
                }

                await ArmyModel.updateOne({
                    userId
                }, {
                    $inc: {
                        monsterProdCurCount: -1 * MonsterInfo[name].SummonCapacity,
                        selectMonsterCount: -1 * MonsterInfo[name].SummonCapacity,
                        [`monsterCountMap.${name}`]: -1,
                        [`selectMonsterMap.${name}`]: -1,
                    }
                })
            }
            else if (type == "Magic") {
                if (army.selectMagicMap.get(name) < 1) {
                    throw new Error("The number of these Magic is less than 1.")
                }

                await ArmyModel.updateOne({
                    userId
                }, {
                    $inc: {
                        magicProdCurCount: -1 * MagicInfo[name].SummonCapacity,
                        selectMagicCount: -1 * MagicInfo[name].SummonCapacity,
                        [`magicCountMap.${name}`]: -1,
                        [`selectMagicMap.${name}`]: -1,
                    }
                })
            }
            else {
                throw new Error("type error!")
            }

            return {
                state: true,
                message: "EditArmy success"
            }

        } catch (e) {
            return {
                state: false,
                message: e.message
            }
        }
    }
}

export default ArmyController;