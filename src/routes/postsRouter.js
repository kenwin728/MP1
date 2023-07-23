import { Router } from 'express';
import { getDb } from '../db/conn.js';

const postsRouter = Router();
const db = getDb();
const posts = db.collection("posts");
const users = db.collection("users");
const replies = db.collection("replies");

postsRouter.get("/posts", async (req, res) => {
    try{
        const postsArray = await posts.find({}).toArray();
        res.render("posts", {
            title: "Posts",
            posts: postsArray,
        });
    } catch (err){
        console.error(err);
    }
});

postsRouter.get("/posts/currentuser/:username", async (req, res) => {
    try{
        const postsArray = await posts.find({}).toArray();
        const currentuser = await users.findOne({username: req.params.username});
        res.render("postsLI", {
            title: "Posts",
            user: currentuser,
            posts: postsArray,
            additionalVariable: req.params.username
        });
    } catch (err){
        console.error(err);
    }
});
//handles deletion of post
postsRouter.get("/post/:postID/delete", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const post = await posts.findOne({postID: postID});
        //store the username of the post before deletion for referencing in res.redirect
        const username = post.username;
        console.log(post);
        const result = await posts.deleteOne({postID: postID});
        const result2 = await replies.deleteMany({postID: postID});
        res.redirect(`/posts/currentuser/${username}`)
    } catch (err){
        console.error(err);
    }
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
postsRouter.post("/post/create/currentuser/:username", async (req, res) => {
    console.log("POST request received for /create");
    console.log(req.body);
    // Get the current date
    const currentDate = new Date();

    // Get the individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Format the date as mm/dd/yyyy
    const formattedDate = `${month}/${day}/${year}`;

    // Convert the formatted date to a string
    const dateString = String(formattedDate);
    try {
        const latestpost = await posts.findOne({}, {sort: {postID: -1}});
        let latestpostID;
        //making sure our post has a unique post ID
        if (latestpost){
            latestpostID = latestpost.postID + 1;
        }
        else{
            latestpostID = 1;
        }
        const result = await posts.insertOne({
            username: req.params.username, 
            title: req.body.posttitle,
            content: req.body.postcontent,
            date: dateString,
            postID: latestpostID,
            downvote: 0,
            upvote: 0,
            views: 0,
            replies: 0
        });

        console.log(result);
        res.redirect(`/posts/currentuser/${req.params.username}`);
    } catch (err) {
        console.error(err);
    }
});

export default postsRouter;