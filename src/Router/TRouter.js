import { Router } from "express";
import TaskController from "../Controller/user/TaskController";
import verifySession from "../middleware/verifySession";

const TRouter = Router();

TRouter.post("/task", verifySession, async (req, res, next) => {
    try {
        const {Name, Type} = req.body;
        
        if (Name == null || Name == undefined ||
            Type == null || Type == undefined ) {
            throw new Error("check your body");
        }

        const result = await TaskController.Create({
            UserId: req.session.userId,
            Name: Name,
            Type: Type
        });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            TaskId: result.taskId
        })
    }
    catch(e) {
        next(e);
    }
})

TRouter.delete("/task/:id", verifySession, async(req, res, next) => {
    try {
        const {id} = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }
        const result = await TaskController.Delete({ UserId: req.session.userId, TaskId: id });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
        })
    } catch(e) {
        next(e);
    }
})

TRouter.get("/task/start/:id", verifySession, async (req, res, next) => {
    try {
        const {id} = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }

        const result = await TaskController.Start({ UserId: req.session.userId, TaskId: id });

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            RemainingTime: result.remainingTime
        })

    } catch(e) {
        next(e);
    }

})

TRouter.get("/task/list", verifySession, async (req, res, next) => {
    try {
        const result = await TaskController.GetTaskList({UserId: req.session.userId});

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            TaskList: result.data
        })

    } catch(e) {
        next(e);
    }
})

TRouter.get("/task/:id", verifySession, async (req, res, next) => {
    try {
        const {id} = req.params;

        if (id == null || id == undefined) {
            throw new Error("check your params")
        }

        const result = await TaskController.GetTask({UserId: req.session.userId, TaskId: id});

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            State: true,
            Message: result.message,
            Task: result.data
        })

    } catch(e) {
        next(e);
    }
})

export default TRouter;