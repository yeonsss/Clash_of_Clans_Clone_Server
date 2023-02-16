import { Router } from "express";
import { mongoose } from "../DB";
import { UserController } from "../Controller/user/UserController";
import BController from "../Controller/user/BController";
import verifySession from "../middleware/verifySession";

const UserRouter = Router();

UserRouter.post("/register", async (req, res, next) => {
    try {
        const { id, password, userName } = req.body;

        if (id == undefined || id == null ||
            password == undefined || password == null
        ) {
            throw new Error("register fail check body");
        }

        const result = await UserController.Register(id, password, userName);

        if (result.state == false) {
            throw new Error("register fail");
        }

        res.status(200).send({
            state: true,
            message: result.message
        });

    } catch (e) {
        next(e);
    }

})

UserRouter.post("/session", verifySession, async (req, res, next) => {
    try {

        if (req.session.userId == null || req.session.userId == undefined) {
            throw new Error("user is not logined")
        }

        res.status(200).send({
            state: true,
            message: "session verifySuccess",
            userId: req.session.userId
        })

    }
    catch (e) {
        res.status(200).send({
            state: false,
            message: e.message,
        })
    }
})

UserRouter.post("/login", async (req, res, next) => {
    try {
        const sessionModel = mongoose.connection.db.collection('sessions');
        if (!sessionModel) {
            throw new Error("session connect error");
        }

        // console.log("prev session");
        // console.log(req.session);
        // console.log(req.sessionID);

        if (req.sessionID) {
            const session = await sessionModel.findOne({
                _id: req.sessionID
            })
            console.log(session);
            if (session != null) {
                throw new Error("You are already logged in.");
            }
        }

        const { id, password } = req.body;
        const result = await UserController.Login(id, password);
        if (result.state == false) {
            throw new Error("Login Fail")
        }

        const userSession = await sessionModel.findOne({
            userId: result.userId
        })
        if (userSession != null) {
            throw new Error("You are already logged in.")
        }

        req.session.isLogined = true;
        req.session.userId = result.userId;
        req.session.save(async () => {
            await sessionModel.updateOne({
                _id: req.sessionID
            }, {
                $set: {
                    "userId": result.userId
                }
            })
        });

        res.status(200).json({
            state: result.state,
            message: result.message
        });
    }
    catch (e) {
        next(e);
    }
})

UserRouter.get("/logout", async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err != null) {
                throw new Error("logout fail");
            }
            res.status(200).send({
                state: true,
                message: "logout success"
            });
        })
    }
    catch (e) {
        next(e)
    }
})

UserRouter.get("/user", verifySession, async (req, res, next) => {
    try {
        const result = await UserController.GetMyData(req.session.userId);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: "get user success",
            userInfo: result.data
        })
    }
    catch (e) {
        next(e);
    }
})

UserRouter.get("/user/build", verifySession, async (req, res, next) => {
    try {

        const result = await BController.GetMyBuilds(req.session.userId);

        if (result.state == false) {
            throw new Error(result.message);
        }

        res.status(200).send({
            state: true,
            message: "get user build success",
            data: result.data
        })
    }
    catch (e) {
        next(e)
    }
})

// UserRouter.get("/user/:id", verifySession, async(req, res, next) => {
//     try {
//         const id = req.params.id;
//         if (id == null || id == undefined) {
//             throw new Error("There is no ID you want to search for.")
//         }

//         const result = await UserController.FindUser(id);

//         if (result.state == false) {
//             throw new Error(result.message);
//         }

//         res.status(200).send({
//             State: true,
//             Message: "get user success",
//             Data: result.data
//         })

//     }
//     catch(e) {
//         next(e);
//     }    
// })



UserRouter.get("/rival", verifySession, async (req, res, next) => {
    try {
        //이렇게 하지 말고 유저중 하나의 데이터를 가져오도록 하자.
        // 티어가 비슷한
        const result = [];

        const users = await UserController.GetUsers();
        if (users.state == false) {
            throw new Error(users.message);
        }

        for (const us of users.data) {
            const build = await BController.GetBuilds(us.UserId);
            console.log(build.builds)
            if (build.state == false) {
                throw new Error(build.message);
            }

            result.push({
                UserId: us.UserId,
                TierPoint: us.TierPoint,
                Builds: build.builds
            })
        }

        res.status(200).send({
            State: true,
            Message: "get rival success",
            Data: result
        })
    }
    catch (e) {
        next(e)
    }
})


export default UserRouter;