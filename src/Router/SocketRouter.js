// import { io } from "../Server.js"
// import { UserController } from "../Controller/user/UserController.js";
// import BController from "../Controller/user/BController.js";
// import BTaskController from "../Controller/user/BTaskController.js";

// // TODO: 로그인 시 요청 가능

// io.on("connection", (socket) => {
//     console.log("someone connected");

//     socket.on("disconnect", async () => {
//         console.log('user disconnected');
//         await UserController.Logout(socket.id);
//     })

//     socket.on('LOGIN', async ({Id, Password}) => {
//         const result = await UserController.Login(Id, Password, socket.id);

//         socket.emit("LOGIN", {
//             State: result.state,
//             Message: result.message,
//         });
//     })

//     socket.on('LOGOUT', async () => {

//         const result = await UserController.Logout(socket.id);

//         socket.emit("LOGOUT", {
//             State: result.state,
//             Message: result.message,
//         });
//     })


//     socket.on('REGISTER', async ({Id, Password, UserName}) => {

//         const result = await UserController.Register(Id, Password, UserName);

//         socket.emit("REGISTER", {
//             State: result.state,
//             Message: result.message,
//         });
//     })

//     socket.on('GET_USER_INFO', async ({UserId}) => {

//         try {
//             const result = await UserController.FindUser(UserId);

//             if (result.data == null) {
//                 throw new Error(result.message);
//             }

//             socket.emit("GET_USER_INFO", {
//                 State: result.state,
//                 Message: result.message,
//                 UserName: result.data.userName,
//                 Credit: result.data.credit,
//                 TierPoint : result.data.tierPoint
//             });

//         }
//         catch(e) {
//             socket.emit("GET_USER_INFO", {
//                 State: false,
//                 Message: e.message,
//             });
//         }
//     })

//     socket.on('GET_MY_INFO', async () => {

//         try {
//             const result = await UserController.GetMyData(socket.id);

//             if (result.data == null) {
//                 throw new Error(result.message);
//             }

//             socket.emit("GET_MY_INFO", {
//                 State: result.state,
//                 Message: result.message,
//                 UserName: result.data.userName,
//                 Credit: result.data.credit,
//                 TierPoint : result.data.tierPoint
//             });

//         }
//         catch(e) {
//             socket.emit("GET_MY_INFO", {
//                 State: false,
//                 Message: e.message,
//             });
//         }
//     })

//     // socket.on('board', (req) => {
//     //     socket.emit("register",{
//     //         Username: "narosu",
//     //         Credit: 1000,
//     //         Success: 100,
//     //         Scraps: [{
//     //             Url: "asdasd",
//     //             Code: 1,
//     //         }]
//     //     }, socket.id)
//     // })

//     socket.on('CREATE_BUILD', async({UserId, Code, PosX, PosY, ClientTime}) => {
//         try {
//             const result = await BController.Create({
//                 UserId, Code, PosX, PosY, ClientTime
//             })
    
//             socket.emit("CREATE_BUILD", {
//                 State : result.state,
//                 Message : result.message,
//                 BuildId : result.buildId
//             })
//         } catch(e) {
//             socket.emit("CREATE_BUILD", {
//                 State : false,
//                 Message : e.message,
//                 BuildId : ""
//             })
//         }
        
//     })

//     socket.on('GET_BUILD_STORAGE', async ({ BuildId }) => {
//         const result = await BController.GetInfo(BuildId);

//         socket.emit("GET_BUILD_STORAGE", {
//             State : result.state,
//             Message : result.message,
//             BuildId : result.buildId,
//             Stored : result.stored,
//             IsFull : result.isFull
//         })
//     })

//     socket.on('GET_USER_BUILDS', async({ UserId }) => {
//         const result = await BController.GetBuilds({ UserId });

//         socket.emit("GET_USER_BUILDS", {
//             State : result.state,
//             Message : result.message,
//             Builds : result.builds
//         })
//     })

//     socket.on('GET_USER_LIST', async () => {
//         const result = await UserController.GetUsers();

//         socket.emit("GET_USER_LIST", {
//             State : result.state,
//             Message : result.message,
//             UserList : result.data
//         })
//     })

//     socket.on('GET_BUILD_COMPLETE', async ({ TaskId }) => {
//         const result = await BTaskController.GetTask(TaskId);
//         socket.emit("GET_BUILD_COMPLETE", {
//             State : result.state,
//             Message : result.message,
//             Done : result.done
//         })

//     })

// })


