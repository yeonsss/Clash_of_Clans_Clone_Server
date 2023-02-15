import BController from "../Controller/user/BController.js";
import TaskController from "../Controller/user/TaskController.js";
import { io } from "../Server.js"

io.on("connection", (socket) => {

    console.log(socket.request.session);

    socket.on("disconnect", async () => {
        socket.request.session.destroy((err) => {
            if (err != null) {
                console.log("session destroy error");
                console.log("error : ", err);
            }
        })
    })

    socket.on('GET_BUILD_STORAGE', async ({ buildId }) => {
        const result = await BController.GetInfo(buildId);

        socket.emit("GET_BUILD_STORAGE", {
            state : result.state,
            message : result.message,
            buildId : result.buildId,
            stored : result.stored,
            isFull : result.isFull
        })
    })

    socket.on('GET_BUILD_COMPLETE', async ({ buildId }) => {
        const result = await BController.GetInfo(buildId);
        socket.emit("GET_BUILD_COMPLETE", {
            state : result.state,
            message : result.message,
            active : result.active
        })
    })

})


