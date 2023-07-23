import { Router } from 'express';
import { getDb } from '../db/conn.js';

const postsRouter = Router();
const db = getDb();
const posts = db.collection("posts");
const users = db.collection("users");

postsRouter.get("/posts", async (req, res) => {
    const postsArray = await posts.find({}).toArray();
    res.render("posts", {
        title: "Posts",
        posts: postsArray,
    });
});

postsRouter.get("/posts/currentuser/:username", async (req, res) => {
    const postsArray = await posts.find({}).toArray();
    const currentuser = await users.findOne({username: req.params.username});
    res.render("postsLI", {
        title: "Posts",
        user: currentuser,
        posts: postsArray,
        additionalVariable: req.params.username
    });
});

postsRouter.post("/post/:postID/edit", async (req, res) => {
    console.log("POST request received for /edit");
    const postID = parseInt(req.params.postID);
    console.log(req.body);
    try {
        const result = await posts.updateOne({
            postID: postID
        },
        {$set: {
            title: req.body.editedtitle,
            content: req.body.editedcontent
        }});
        const post = await posts.findOne({postID: postID});
        res.redirect(`/replies/${post.postID}/currentuser/${post.username}`)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

//for creating post (still not yet done)
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
    // posts.insertOne(req.body);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default postsRouter;