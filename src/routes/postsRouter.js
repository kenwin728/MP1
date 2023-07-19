import { Router } from 'express';
import { getDb } from '../db/conn.js';

const postsRouter = Router();
const db = getDb();
const posts = db.collection("posts");

postsRouter.get("/posts", async (req, res) => {
    const postsArray = await posts.find({}).toArray();
    res.render("posts", {
        title: "Posts",
        posts: postsArray
    });
});

postsRouter.post("/posts", async (req, res) => {
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
    // users.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default postsRouter;