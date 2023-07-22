import { Router } from 'express';
import { getDb } from '../db/conn.js';

const userRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

userRouter.get("/user/:username", async (req, res) => {
    try{
        const username = req.params.username;
        const user = await users.findOne({username: username});
        const post = await posts.findOne({username: username}, {sort: {postID: -1}});
        res.render("user", {
            title: "user",
            user: user,
            post: post
        });
    } catch(err){
        console.error(err);
    }
    
});

userRouter.post("/replies", async (req, res) => {
    console.log("POST request received for /posts");
    console.log(req.body);
    try {
        const result = await posts.insertOne({
            username: req.body.username, 
            title: req.body.title
        });

        console.log(result);
        res.sendStatus(200);
    // or you can write
    // posts.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default userRouter;