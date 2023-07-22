import { Router } from 'express';
import { getDb } from '../db/conn.js';

const loginRouter = Router();
const db = getDb();
const users = db.collection("users");

loginRouter.get("/login", async (req, res) => {
    res.render("login", {
        title: "LoginPage",
    });
});


export default loginRouter;