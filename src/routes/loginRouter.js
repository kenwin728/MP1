import { Router } from 'express';
import { getDb } from '../db/conn.js';
import alert from 'alert';

const loginRouter = Router();
const db = getDb();
const users = db.collection("users");

loginRouter.get("/login", async (req, res) => {
    res.render("login", {
        title: "LoginPage",
    });
});

loginRouter.post("/login", async (req, res) => {
    console.log("POST request received for /login");
    console.log(req.body);
    try {
        const user = await users.findOne({username: req.body.username});
        console.log(user);
        if (user){
            if (user.password === req.body.password){
                console.log("Successful Login");
                res.json(`/posts/currentuser/${req.body.username}`);
            }
            else {
                alert("Incorrect User or Password");
            }
        }
        else {
            alert("Incorrect User or Password");
        }
    

    // or you can write
    // posts.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});



export default loginRouter;