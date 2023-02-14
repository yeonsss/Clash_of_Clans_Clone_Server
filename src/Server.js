import express from 'express';
import cors from 'cors';
import http from 'http';
import RSchedule from './Task/RSchedule';
import BSchedule from './Task/BSchedule';
import BRouter from './Router/BRouter';
import TRouter from './Router/TRouter';
import UserRouter from './Router/UserRouter';
import errorMiddleware from './middleware/errorMiddleware';
import dotenv from "dotenv";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import TaskSchedule from './Task/TaskSchedule';
import ArmyRouter from './Router/ArmyRouter';

dotenv.config();

// create Express App
const app = express();

// req에 session 프로퍼티를 추가해준다.
// 내부적으로 세션 저장소에 세션 값들을 저장한다.
app.use(session({
    secret: process.env.SESSION_KEY, // 숨겨야 한다.
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 week
    },
    resave: false, // false? 세션 데이터가 바뀌기 전까진 세션을 저장하지 않는다. (불필요하게 저장하며안되므로 false)
    saveUninitialized: true, // true?? 세션이 필요하기 전까진 세션을 구동하지 않는다. // 서버 부담
    store: MongoStore.create({
        mongoUrl : process.env.MONGODB_URL
    })
}))

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
const server = http.createServer(app);

setTimeout(() => {
    RSchedule();    
    BSchedule();
    TaskSchedule();
}, 1000);

export {app, server};