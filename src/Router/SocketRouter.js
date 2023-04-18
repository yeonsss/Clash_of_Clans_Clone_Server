import BattleController from "../Controller/user/BattleController.js";
import BController from "../Controller/user/BController.js";
import TaskController from "../Controller/user/TaskController.js";
import { io } from "../Server.js"
import FindClientSocket from "../utils/FindClientSocket.js";

io.on("connection", (socket) => {

    console.log(`${socket.request.session.userId} socket connect`);
    socket.data.username = socket.request.session.userId

    socket.on("disconnect", async () => {
        await BattleController.BattleDone({
            userId: socket.request.session.userId,
            win: false
        })
    })

    socket.on('GET_BUILD_COMPLETE', async ({ buildId }) => {
        const result = await BController.GetInfo(buildId);
        socket.emit("GET_BUILD_COMPLETE", {
            state: result.state,
            message: result.message,
            active: result.active
        })
    })

})


