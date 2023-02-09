import 'dotenv/config'
import { app, server } from "./src/Server.js"

// Call Routers for Multiplexing
// import "./src/Router/SocketRouter.js"

const PORT = process.env.SERVER_PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on * : ${PORT}`);
});