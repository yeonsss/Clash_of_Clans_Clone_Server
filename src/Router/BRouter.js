import { Router } from "express";
import BController from "../Controller/user/BController";
import verifySession from "../middleware/verifySession";

const BRouter = Router();

BRouter.get("/build/complete/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BController.GetInfo(id);
        if (result.state == false) {
            throw new Error(result.message)
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            Done: result.active
        });
    } catch(e) {
        next(e);
    }
})

BRouter.get("/build/upgrade/:id", verifySession, async(req, res, next) => {
    try {
        const {id} = req.params;
        if (id == null || id == undefined) {
            throw new Error("check build id");
        }

        const result = await BController.Upgrade({
            UserId: req.session.userId,
            BuildId: id
        })

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: result.state,
            Message: result.message
        })

    } catch(e) {
        next(e);
    }
})

BRouter.get("/build/resource", verifySession, async(req, res, next) => {
    try {
        const result = await BController.GetResource(req.session.userId);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: result.state,
            Message: result.message,
            Credit: result.credit
        })

    } catch(e) {
        next(e);
    }
})

BRouter.post("/build/position", verifySession, async (req, res, next) => {
    try {
        const { BuildId, PosX, PosY } = req.body;

        if (BuildId == null || BuildId == undefined ||
            PosX == null || PosX == undefined ||
            PosY == null || PosY == undefined
            ) {
            throw new Error("change build pos fail");
        }

        const result = await BController.MovePos({
            UserId: req.session.userId, BuildId, PosX, PosY
        })

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message
        })

    } catch(e) {
        next(e);
    }
})

BRouter.get("/build/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BController.GetInfo(id);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            Stored: result.stored,
            Max: result.max,
            isFull: result.isFull
        })
    }
    catch(e) {
        next(e);
    }
    
})

BRouter.post("/build", verifySession, async (req, res, next) => {
    try {
        const { Code, PosX, PosY, ClientTime } = req.body;

        // if (Code == null || Code == undefined ||
        //     PosX == null || PosX == undefined ||
        //     PosY == null || PosY == undefined ||
        //     ClientTime == null || ClientTime == undefined
        //     ) {
        //     throw new Error("create build fail");
        // }

        const date = new Date();

        const result = await BController.Create({
            UserId: req.session.userId, Code, PosX, PosY, ClientTime: date
        })

        if (result.state == false) {
            throw new Error("create build fail");
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            BuildId: result.buildId
        })

    } catch(e) {
        next(e);
    }
})

export default BRouter;