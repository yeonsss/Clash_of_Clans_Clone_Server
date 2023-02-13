import { Router } from "express";
import TaskController from "../Controller/user/TaskController";
import verifySession from "../middleware/verifySession";

const TRouter = Router();

TRouter.post("/task", verifySession, async (req, res, next) => {
    try {
        const { name, type } = req.body;

        if (name == null || name == undefined ||
            type == null || type == undefined) {
            throw new Error("check your body");
        }

        const result = await TaskController.Create({
            userId: req.session.userId,
            name: name,
            type: type
        });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
            taskId: result.taskId
        })
    }
    catch (e) {
        next(e);
    }
})

TRouter.delete("/task/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }
        const result = await TaskController.Delete({ userId: req.session.userId, taskId: id });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
        })
    } catch (e) {
        next(e);
    }
})

TRouter.get("/task/start/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }

        const result = await TaskController.Start({ userId: req.session.userId, taskId: id });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
            remainingTime: result.remainingTime
        })

    } catch (e) {
        next(e);
    }

})

TRouter.get("/task/list", verifySession, async (req, res, next) => {
    try {
        const result = await TaskController.GetTaskList({ userId: req.session.userId });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
            taskList: result.data
        })

    } catch (e) {
        next(e);
    }
})

TRouter.get("/task/:id", verifySession, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }

        const result = await TaskController.GetTask({ userId: req.session.userId, taskId: id });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: result.message,
            task: result.data
        })

    } catch (e) {
        next(e);
    }
})

export default TRouter;