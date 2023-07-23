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
        //Increment views of post everytime we visit
        const result = await posts.updateOne({postID: postID},{$inc: {views: 1}});
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
        //Increment views of post everytime we visit
        const result = await posts.updateOne({postID: postID},{$inc: {views: 1}});
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

//Handles deletion of reply
repliesRouter.get("/reply/:replyID/delete", async (req, res) => {
    try{
        const replyID = parseInt(req.params.replyID);
        const reply = await replies.findOne({replyID: replyID});
        //store the post ID and the username of the reply before deletion so we can reference that in our res.redirect
        const postID = reply.postID;
        const username = reply.username;
        console.log(reply);
        const result = await replies.deleteOne({replyID: replyID});
        res.redirect(`/replies/${postID}/currentuser/${username}`)
    } catch(err){
        console.error(err);
    }
    
});

repliesRouter.post("/reply/:replyID/edit", async (req, res) => {
    console.log("POST request received for /edit");
    const replyID = parseInt(req.params.replyID);
    console.log(req.body.reply);
    try {
        const result = await replies.updateOne({
            replyID: replyID
        },
        {$set: {
            content: req.body.reply
        }});
        const reply = await replies.findOne({replyID: replyID});
        res.redirect(`/replies/${reply.postID}/currentuser/${reply.username}`)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default repliesRouter;