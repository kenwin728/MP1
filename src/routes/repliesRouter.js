import { Router } from 'express';
import { getDb } from '../db/conn.js';
import {ObjectId} from 'mongodb';

const repliesRouter = Router();
const db = getDb();
const replies = db.collection("replies");
const posts = db.collection("posts");

repliesRouter.get("/replies/:postID", async (req, res) => {
    const postID = new ObjectId(req.params.postID);
    const repliesArray = await replies.find({postID: postID}).toArray();
    const post = await posts.findOne({_id: postID});
    res.render("postandreply", {
        title: "postandreply",
        post: post,
        replies: repliesArray
    });
});

repliesRouter.post("/replies", async (req, res) => {
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

export default repliesRouter;