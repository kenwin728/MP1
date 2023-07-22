import { Router } from 'express';
import { getDb } from '../db/conn.js';

const registerRouter = Router();
const db = getDb();
const users = db.collection("users");

registerRouter.get("/register", async (req, res) => {
    res.render("register", {
        title: "RegisterPage",
    });
});

registerRouter.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    console.log(req.body);
    try {
        const result = await users.insertOne({
            username: req.body.username, 
            password: req.body.password,
            description: "",
            photo: "",
            numberofposts: 0
        });
        res.redirect("/login");
        console.log(result);
    // or you can write
    // users.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default registerRouter;