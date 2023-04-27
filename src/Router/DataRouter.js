import { Router } from "express";
import BuildingInfo from "../Data/BuildingInfo";
import MonsterInfo from "../Data/MonsterInfo";
import StageInfo from "../Data/StageInfo";

import verifySession from "../middleware/verifySession";

const DataRouter = Router();

DataRouter.get("/monster", verifySession, async (req, res, next) => {
    try {

        console.log(MonsterInfo);
    }
    catch (e) {
        next(e);
    }
})

DataRouter.get("/build", verifySession, async (req, res, next) => {
    try {
        console.log(BuildingInfo);
    }
    catch (e) {
        next(e);
    }
})

DataRouter.get("/singlemap", verifySession, async (req, res, next) => {
    try {
        console.log(StageInfo);
    }
    catch (e) {
        next(e);
    }
})

export default DataRouter;