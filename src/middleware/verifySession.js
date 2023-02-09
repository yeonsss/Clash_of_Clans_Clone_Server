import dotenv from "dotenv";
dotenv.config();

const verifySession = async (req, res, next) => {
    try {
        const sessionData = req.session;
        if (sessionData.isLogined == true) {
            next();
        }
        else {
            throw new Error("Please log in.");
        }
    }
    catch(e) {
        next(e.message);
    }
};

export default verifySession;