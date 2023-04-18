import { ArmyModel, BattleModel, UserModel } from "../../DB";

class BattleController {
    static CreateBattle = async ({ userId, targetId }) => {
        try {
            await BattleModel.create({
                userId: userId,
                targetId: targetId
            });

            return {
                state: true,
                message: "Battle Start",
            }

        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static DeleteBattle = async ({ }) => {
        try {





        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }

    static BattleDone = async ({
        userId,
        win,
        rivalId,
        selectMagicMap,
        selectMonsterMap
    }) => {
        try {
            const result = await BattleModel.findOneAndDelete({ userId });
            if (result == null) {
                throw new Error("You are not in battle.")
            }

            await UserModel.updateOne({
                _id: userId
            }, {
                $inc: {
                    tierPoint: win == true ? 1 : -1
                }
            })

            await UserModel.updateOne({
                _id: result.targetId
            }, {
                $inc: {
                    tierPoint: win == true ? -1 : 1
                }
            })

            const myArmy = await ArmyModel.findOne({ userId });

            console.log(myArmy);

            console.log(selectMagicMap);
            console.log(selectMonsterMap);

            let useMagicCount = 0;
            let useMonsterCount = 0;

            let magicPC = 0;
            let monsterPC = 0;

            const newMagicMap = new Map();
            const newMonsterMap = new Map();

            if (Object.keys(selectMagicMap).length > 0) {
                const selectMagicValueList = Object.values(selectMagicMap);
                for (const count of selectMagicValueList) {
                    useMagicCount += count;
                }

                magicPC = myArmy.magicProdCurCount - (myArmy.selectMagicCount - useMagicCount);

                for (const key of myArmy.magicCountMap.keys()) {
                    const sc = selectMagicMap[key];
                    const mc = myArmy.magicCountMap.get(key) - (myArmy.selectMagicMap.get(key) - sc);
                    newMagicMap.set(key, mc);
                }
            }

            if (Object.keys(selectMonsterMap).length > 0) {
                const selectMonsterValueList = Object.values(selectMonsterMap);

                for (const count of selectMonsterValueList) {
                    useMonsterCount += count;
                }

                monsterPC = myArmy.monsterProdCurCount - (myArmy.selectMonsterCount - useMonsterCount);

                for (const key of myArmy.monsterCountMap.keys()) {
                    const sc = selectMonsterMap[key];
                    const mc = myArmy.monsterCountMap.get(key) - (myArmy.selectMonsterMap.get(key) - sc);
                    newMonsterMap.set(key, mc);
                }
            }

            await ArmyModel.updateOne({
                userId: userId
            }, {
                monsterProdCurCount: monsterPC,
                magicProdCurCount: magicPC,
                monsterCountMap: newMonsterMap,
                magicCountMap: newMagicMap,
                selectMonsterMap: new Map(Object.entries(selectMonsterMap)),
                selectMagicMap: new Map(Object.entries(selectMagicMap)),
                selectMagicCount: useMagicCount,
                selectMonsterCount: useMonsterCount,
            })

            return {
                state: true,
                message: "Battle Done"
            }

        } catch (e) {
            console.log(e.stack)
            return {
                state: false,
                message: e.message
            }
        }
    }
}

export default BattleController;