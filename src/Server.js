import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import https from 'https'
import RSchedule from './Task/RSchedule';
import BSchedule from './Task/BSchedule';
import BRouter from './Router/BRouter';
import TRouter from './Router/TRouter';
import UserRouter from './Router/UserRouter';
import errorMiddleware from './middleware/errorMiddleware';
import dotenv from "dotenv";
import session, { Session } from 'express-session';
import MongoStore from 'connect-mongo';
import TaskSchedule from './Task/TaskSchedule';
import ArmyRouter from './Router/ArmyRouter';
import fs from 'fs';

const httpsOptions = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./public.pem')
}

dotenv.config();

// create Express App
const app = express();

// req에 session 프로퍼티를 추가해준다.
// 내부적으로 세션 저장소에 세션 값들을 저장한다.
const sessionMiddleware = session({
    secret: process.env.SESSION_KEY, // 숨겨야 한다.
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 week
    },
    resave: false, // false? 세션 데이터가 바뀌기 전까진 세션을 저장하지 않는다. (불필요하게 저장하며안되므로 false)
    saveUninitialized: false, // true?? 세션이 필요하기 전까진 세션을 구동하지 않는다. // 서버 부담
    store: MongoStore.create({
        mongoUrl : process.env.MONGODB_URL
    })
});

app.use(sessionMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {
    console.log(req.session)

    res.send("hello session");
})

app.use(UserRouter);
app.use(BRouter);
app.use(TRouter);
app.use(ArmyRouter);

app.use(errorMiddleware);

// create HTTP Server use Express App -> for WebSocket
const server = https.createServer(httpsOptions, app);
const io = new Server(server, {
    path: '/socket',
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.isLogined) {
        console.log("session logined")
        next();
    } else {
        console.log("please login")
        next({
            state: false,
            message : "not authorized. Please retry later"
        });
    }
});

// client-side
// socket.on("connect_error", (err) => {
//     console.log(err instanceof Error); // true
//     console.log(err.message); // not authorized
//     console.log(err.data); // { content: "Please retry later" }
//   });

setTimeout(() => {
    RSchedule();    
    BSchedule();
    TaskSchedule();
}, 1000);

export {app, server, io};