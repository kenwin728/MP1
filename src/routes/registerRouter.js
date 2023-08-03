import { Router } from 'express';
import { getDb } from '../db/conn.js';
import alert from 'alert';
import bcrypt from 'bcrypt';

const registerRouter = Router();
const db = getDb();
const users = db.collection("users");
const SALT_WORK_FACTOR = 10;

registerRouter.get("/register", async (req, res) => {
    res.render("register", {
        title: "RegisterPage",
    });
});

registerRouter.post("/register", async (req, res) => {
    console.log("POST request received for /register");
    console.log(req.body);
    try {
        const user = await users.findOne({username: req.body.username});
        if (user){
            alert("Username already used!");
            res.redirect("/register");
        }
        else{
            if (req.body.password === req.body.confirmpassword){
                const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                const hash = await bcrypt.hash(req.body.password, salt);
                const result = await users.insertOne({
                    username: req.body.username, 
                    password: hash,
                    description: "",
                    photo: "",
                    numberofposts: 0
                });
                res.redirect("/login");
            }
            else{
                alert("Password and Confirm Password don't match!");
                res.redirect("/register");
            }
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default registerRouter;