import { Router } from 'express';
import { getDb } from '../db/conn.js';
import { mergeArrays } from '../helpers/customHelpers.js'

const repliesRouter = Router();
const db = getDb();
const replies = db.collection("replies");
const posts = db.collection("posts");
const users = db.collection("users");
const replylikes = db.collection("replylikes");
const replydislikes = db.collection("replydislikes");
const postlikes = db.collection("postlikes");
const postdislikes = db.collection("postdislikes");

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
            title: post.title,
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
            title: post.title,
            post: post,
            user: postUser,
            mergedData: mergedData,
            currentuser: req.params.username
        });
    } catch(err){
        console.error(err);
    }
    
});
//Upvote post
repliesRouter.get("/upvotepost/:postID/currentuser/:username", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const currentuser = req.params.username;
        const likedata = await postlikes.findOne({postID: postID, username: currentuser});
        const dislikedata = await postdislikes.findOne({postID: postID, username: currentuser});
        if (likedata){
            const decrementpostlikes = await posts.updateOne({postID: postID},{$inc: {upvote: -1}});
            const deletepostlike = await postlikes.deleteOne({postID: postID, username: currentuser});
        }
        else if (dislikedata){
            const incrementpostlikes = await posts.updateOne({postID: postID},{$inc: {upvote: 1}});
            const decrementpostdislikes = await posts.updateOne({postID: postID},{$inc: {downvote: -1}});
            const deletepostdislike = await postdislikes.deleteOne({postID: postID, username: currentuser});
            const addpostlike = await postlikes.insertOne({postID: postID, username: currentuser});
        }
        else{
            const incrementpostlikes = await posts.updateOne({postID: postID},{$inc: {upvote: 1}});
            const addpostlike = await postlikes.insertOne({postID: postID, username: currentuser});
        }
        res.redirect(`/replies/${postID}/currentuser/${currentuser}`);
    } catch(err){
        console.error(err);
    }
    
});
//Downvote post
repliesRouter.get("/downvotepost/:postID/currentuser/:username", async (req, res) => {
    try{
        const postID = parseInt(req.params.postID);
        const currentuser = req.params.username;
        const likedata = await postlikes.findOne({postID: postID, username: currentuser});
        const dislikedata = await postdislikes.findOne({postID: postID, username: currentuser});
        if (dislikedata){
            const decrementpostdislikes = await posts.updateOne({postID: postID},{$inc: {downvote: -1}});
            const deletepostdislike = await postdislikes.deleteOne({postID: postID, username: currentuser});
        }
        else if (likedata){
            const incrementpostdislikes = await posts.updateOne({postID: postID},{$inc: {downvote: 1}});
            const decrementpostlikes = await posts.updateOne({postID: postID},{$inc: {upvote: -1}});
            const deletepostlike = await postlikes.deleteOne({postID: postID, username: currentuser});
            const addpostdislike = await postdislikes.insertOne({postID: postID, username: currentuser});
        }
        else{
            const incrementpostdislikes = await posts.updateOne({postID: postID},{$inc: {downvote: 1}});
            const addpostdislike = await postdislikes.insertOne({postID: postID, username: currentuser});
        }
        res.redirect(`/replies/${postID}/currentuser/${currentuser}`);
    } catch(err){
        console.error(err);
    }
    
});
//Upvote reply
repliesRouter.get("/upvotereply/:replyID/currentuser/:username", async (req, res) => {
    try{
        const replyID = parseInt(req.params.replyID);
        const currentuser = req.params.username;
        const likedata = await replylikes.findOne({replyID: replyID, username: currentuser});
        const dislikedata = await replydislikes.findOne({replyID: replyID, username: currentuser});
        if (likedata){
            const decrementreplylikes = await replies.updateOne({replyID: replyID},{$inc: {upvote: -1}});
            const deletereplylike = await replylikes.deleteOne({replyID: replyID, username: currentuser});
        }
        else if (dislikedata){
            const incrementreplylikes = await replies.updateOne({replyID: replyID},{$inc: {upvote: 1}});
            const decrementreplydislikes = await replies.updateOne({replyID: replyID},{$inc: {downvote: -1}});
            const deletereplydislike = await replydislikes.deleteOne({replyID: replyID, username: currentuser});
            const addreplylike = await replylikes.insertOne({replyID: replyID, username: currentuser});
        }
        else{
            const incrementreplylikes = await replies.updateOne({replyID: replyID},{$inc: {upvote: 1}});
            const addreplylike = await replylikes.insertOne({replyID: replyID, username: currentuser});
        }

        const reply = await replies.findOne({replyID: replyID});
        console.log(reply);
        res.redirect(`/replies/${reply.postID}/currentuser/${currentuser}`);
    } catch(err){
        console.error(err);
    }
    
});
//Downvote reply
repliesRouter.get("/downvotereply/:replyID/currentuser/:username", async (req, res) => {
    try{
        const replyID = parseInt(req.params.replyID);
        const currentuser = req.params.username;
        const likedata = await replylikes.findOne({replyID: replyID, username: currentuser});
        const dislikedata = await replydislikes.findOne({replyID: replyID, username: currentuser});
        if (dislikedata){
            const decrementreplydislikes = await replies.updateOne({replyID: replyID},{$inc: {downvote: -1}});
            const deletereplydislike = await replydislikes.deleteOne({replyID: replyID, username: currentuser});
        }
        else if (likedata){
            const incrementreplydislikes = await replies.updateOne({replyID: replyID},{$inc: {downvote: 1}});
            const decrementreplylikes = await replies.updateOne({replyID: replyID},{$inc: {upvote: -1}});
            const deletereplylike = await replylikes.deleteOne({replyID: replyID, username: currentuser});
            const addreplydislike = await replydislikes.insertOne({replyID: replyID, username: currentuser});
        }
        else{
            const incrementreplydislikes = await replies.updateOne({replyID: replyID},{$inc: {downvote: 1}});
            const addreplydislike = await replydislikes.insertOne({replyID: replyID, username: currentuser});
        }

        const reply = await replies.findOne({replyID: replyID});
        console.log(reply);
        res.redirect(`/replies/${reply.postID}/currentuser/${currentuser}`);
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
        const deletereply = await replies.deleteOne({replyID: replyID});
        //Delete all the likes related to the reply in the replylikes table
        const deletereplylikes = await replylikes.deleteMany({replyID: replyID});
        //Delete all the dislikes related to the reply in the replydislikes table
        const deletereplydislikes = await replydislikes.deleteMany({replyID: replyID});
        //Decrease the number of replies for the post
        const decrementpostreplies = await posts.updateOne({postID: postID}, {$inc: {replies: -1}});
        res.redirect(`/replies/${postID}/currentuser/${username}`)
    } catch(err){
        console.error(err);
    }
    
});

//Edit Reply
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
        res.redirect(`/replies/${reply.postID}/currentuser/${reply.username}`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
//Create Reply
repliesRouter.post("/reply/:postID/create/currentuser/:username", async (req, res) => {
    console.log("POST request received for /create");
    const postID = parseInt(req.params.postID);
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
        const latestreply = await replies.findOne({}, {sort: {replyID: -1}});
        let latestreplyID;
        //making sure our reply has a unique reply ID
        if (latestreply){
            latestreplyID = latestreply.replyID + 1;
        }
        else{
            latestreplyID = 1;
        }
        const result = await replies.insertOne({
            username: req.params.username, 
            content: req.body.replycontent,
            date: dateString,
            postID: postID,
            downvote: 0,
            upvote: 0,
            replyID: latestreplyID
        });
        //Increase the number of replies for the post
        const result2 = await posts.updateOne({postID: postID},{$inc: {replies: 1}});
        console.log(result);
        console.log(result2);
        res.redirect(`/replies/${postID}/currentuser/${req.params.username}`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default repliesRouter;
