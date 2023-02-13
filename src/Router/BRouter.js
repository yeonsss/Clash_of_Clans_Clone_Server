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
            state: true,
            message: result.message,
            done: result.active
        });
    } catch (e) {
        next(e);
    }
})

BRouter.get("/build/upgrade/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id == null || id == undefined) {
            throw new Error("check build id");
        }

        const result = await BController.Upgrade({
            userId: req.session.userId,
            buildId: id
        })

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message
        })

    } catch (e) {
        next(e);
    }
})

BRouter.get("/build/resource", verifySession, async (req, res, next) => {
    try {
        const result = await BController.GetResource(req.session.userId);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: result.state,
            message: result.message,
            credit: result.credit
        })

    } catch (e) {
        next(e);
    }
})

BRouter.post("/build/position", verifySession, async (req, res, next) => {
    try {
        const { buildId, posX, posY } = req.body;

        if (buildId == null || buildId == undefined ||
            posX == null || posX == undefined ||
            posY == null || posY == undefined
        ) {
            throw new Error("change build pos fail");
        }

        const result = await BController.MovePos({
            userId: req.session.userId, buildId, posX, posY
        })

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

BRouter.get("/build/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BController.GetInfo(id);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
            stored: result.stored,
            max: result.max,
            isFull: result.isFull
        })
    }
    catch (e) {
        next(e);
    }

})

BRouter.post("/build", verifySession, async (req, res, next) => {
    try {
        const { name, posX, posY, clientTime } = req.body;

        if (name == null || name == undefined ||
            posX == null || posX == undefined ||
            posY == null || posY == undefined ||
            clientTime == null || clientTime == undefined
        ) {
            throw new Error("create build fail");
        }

        const result = await BController.Create({
            userId: req.session.userId, name, posX, posY, clientTime: clientTime
        })

        if (result.state == false) {
            throw new Error("create build fail");
        }

        res.status(200).send({
            state: true,
            message: result.message,
            buildId: result.buildId
        })

    } catch (e) {
        next(e);
    }
})

export default BRouter;