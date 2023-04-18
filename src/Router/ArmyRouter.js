import { Router } from "express";
import ArmyController from "../Controller/user/ArmyController";
import verifySession from "../middleware/verifySession";

const ArmyRouter = Router();

ArmyRouter.get("/army/battle", verifySession, async (req, res, next) => {
    try {
        const userId = req.session.userId;
        const result = await ArmyController.SelectArmyCheck({ userId });
        if (result.state == false) {
            throw new Error(result.message)
        }

        res.status(200).send({
            state: result.state,
            message: result.message,
            possible: result.possible
        })
    }
    catch (e) {
        next(e);
    }
})

ArmyRouter.get("/army", verifySession, async (req, res, next) => {
    try {
        const result = await ArmyController.GetMyArmy({ userId: req.session.userId });
        if (result.state == false) {
            throw new Error(result.message)
        }

        res.status(200).send({
            state: result.state,
            message: result.message,
            armyInfo: result.armyInfo
        })

    } catch (e) {
        next(e);
    }
})

ArmyRouter.get("/army/select", verifySession, async (req, res, next) => {
    try {
        const result = await ArmyController.GetMySelectArmy({
            userId: req.session.userId
        })
        if (result.state == false) {
            throw new Error(result.message)
        }
        res.status(200).send({
            state: result.state,
            message: result.message,
            selectInfo: result.selectInfo
        })

    } catch (e) {
        next(e)
    }
})

ArmyRouter.post("/army/levelup", verifySession, async (req, res, next) => {
    try {
        const { name, type } = req.body;

        const result = await ArmyController.UpgradeArmy({
            userId: req.session.userId,
            name,
            type
        })

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message
        })

    } catch (e) {
        next(e)
    }
})

// setting army map
ArmyRouter.post("/army", verifySession, async (req, res, next) => {
    try {
        const { name, type } = req.body;

        const result = await ArmyController.DeleteSelect({
            userId: req.session.userId,
            name: name,
            type: type
        });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message
        })

    } catch (e) {
        next(e)
    }
})

ArmyRouter.post("/army/all", verifySession, async (req, res, next) => {
    try {
        const { type } = req.body;

        if (type != "Monster" && type != "Magic") {
            throw new Error("type error!");
        }

        const result = await ArmyController.DeleteSelectAll({
            userId: req.session.userId,
            type: type
        });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message
        })

    } catch (e) {
        next(e)
    }
})



// ArmyRouter.get("/army/select", verifySession, async(req, res, next) => {
//     try {

//     } catch(e) {
//         next(e)
//     }
// })

export default ArmyRouter;