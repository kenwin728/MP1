import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { mergeArrays } from '../helpers/customHelpers.js'

const repliesRouter = Router();
const db = getDb();
const replies = db.collection("replies");
const posts = db.collection("posts");
const users = db.collection("users");

repliesRouter.get("/replies/:postID", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        //added {sort: {replyID: -1}} to sort the replies with decreasing replyID so we can get the latest reply first
        const repliesArray = await replies.find({postID: postID}, {sort: {replyID: -1}}).toArray();
        const usersArray = [];
        for (const reply of repliesArray) {
            // Find the corresponding user for each reply
            const user = await users.findOne({ username: reply.username });
            // Push the user to the array
            usersArray.push(user);
        }
        const mergedData = mergeArrays(repliesArray, usersArray);
        const post = await posts.findOne({postID: postID});
        const postUser = await users.findOne({username: post.username});
        res.render("postandreply", {
            title: "postandreply",
            post: post,
            user: postUser,
            mergedData: mergedData
        });
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.get("/replies/:postID/currentuser/:username", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const repliesArray = await replies.find({postID: postID}).toArray();
        const usersArray = [];
        for (const reply of repliesArray) {
            // Find the corresponding user for each reply
            const user = await users.findOne({ username: reply.username });
            // Push the user to the array
            usersArray.push(user);
        }
        const mergedData = mergeArrays(repliesArray, usersArray);
        const post = await posts.findOne({postID: postID});
        const postUser = await users.findOne({username: post.username});
        res.render("postandreplyLI", {
            title: "postandreply",
            post: post,
            user: postUser,
            mergedData: mergedData,
            currentuser: req.params.username
        });
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.get("/upvotepost/:postID/currentuser/:username", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const result = await posts.updateOne({postID: postID},{$inc: {upvote: 1}});
        res.redirect(`/replies/${postID}/currentuser/${req.params.username}`);
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.get("/downvotepost/:postID/currentuser/:username", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const result = await posts.updateOne({postID: postID},{$inc: {downvote: 1}});
        res.redirect(`/replies/${postID}/currentuser/${req.params.username}`);
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.get("/upvotereply/:replyID/currentuser/:username", async (req, res) => {
    try{
        const replyID = parseInt(req.params.replyID);
        const result = await replies.updateOne({replyID: replyID},{$inc: {upvote: 1}});
        const reply = await replies.findOne({replyID: replyID});
        console.log(reply);
        res.redirect(`/replies/${reply.postID}/currentuser/${req.params.username}`);
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.get("/downvotereply/:replyID/currentuser/:username", async (req, res) => {
    try{
        const replyID = parseInt(req.params.replyID);
        const result = await replies.updateOne({replyID: replyID},{$inc: {downvote: 1}});
        const reply = await replies.findOne({replyID: replyID});
        console.log(reply);
        res.redirect(`/replies/${reply.postID}/currentuser/${req.params.username}`);
    } catch(err){
        console.error(err);
    }
    
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