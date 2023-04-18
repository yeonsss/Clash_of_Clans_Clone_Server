import { Router } from "express";
import BattleController from "../Controller/user/BattleController";
import verifySession from "../middleware/verifySession";

const BattleRouter = Router();

BattleRouter.post("/battle/start", verifySession, async (req, res, next) => {
    try {
        const userId = req.session.userId;
        const { targetId } = req.body;

        if (targetId == undefined || targetId == null) {
            throw new Error("targetId is invalid");
        }

        const result = await BattleController.CreateBattle({ userId, targetId });
        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: "battle start!"
        })

    } catch (e) {
        next(e);
    }
})

BattleRouter.post("/battle/done", verifySession, async (req, res, next) => {
    try {
        const userId = req.session.userId;
        const { win, rivalId, selectMonsterMap, selectMagicMap } = req.body;

        if (win == null || win == undefined ||
            selectMagicMap == null || selectMagicMap == undefined ||
            selectMonsterMap == null || selectMonsterMap == undefined
        ) {
            throw new Error("battle done error");
        }

        // TODO: 남은 몬스터 숫자도 같이 전달 받음

        const result = await BattleController.BattleDone({
            userId,
            win,
            rivalId,
            selectMagicMap,
            selectMonsterMap
        });
        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message
        })

    } catch (e) {
        next(e);
    }
})

export default BattleRouter;