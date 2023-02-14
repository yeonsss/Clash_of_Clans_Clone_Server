import { Router } from "express";
import ArmyController from "../Controller/user/ArmyController";
import verifySession from "../middleware/verifySession";

const ArmyRouter = Router();

ArmyRouter.get("/army", verifySession, async(req, res, next) => {
    try {
        const result = await ArmyController.GetMyArmy({userId : req.session.userId});
        if (result.state == false) {
            throw new Error(result.message)
        }

        res.status(200).send({
            state: result.state,
            message: result.message,
            armyInfo : result.armyInfo
        })

    } catch(e) {
        next(e);
    }
})

ArmyRouter.get("/army/select", verifySession, async(req, res, next) => {
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
            selectInfo : result.selectInfo
        })

    } catch(e) {
        next(e)
    }
})

ArmyRouter.post("/army/levelup", verifySession, async(req, res, next) => {
    try{
        const {name, type} = req.body;

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

    } catch(e) {
        next(e)
    }
})

// setting army map
ArmyRouter.delete("/army", verifySession, async(req, res, next) => {
    try {
        const {name, type} = req.body;

        const result = await ArmyController.DeleteSelect({
            userId: req.session.userId,
            name : name,
            type: type
        });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message
        })

    } catch(e) {
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