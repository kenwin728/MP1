import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { getDb } from '../db/conn.js';

const userRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");
const replies = db.collection("replies");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer ({storage: storage});

userRouter.get("/user/:username", async (req, res) => {
    try{
        const username = req.params.username;
        const user = await users.findOne({username: username});
        const post = await posts.findOne({username: username}, {sort: {postID: -1}});
        const reply = await replies.findOne({username: username}, {sort: {replyID: -1}});
        res.render("user", {
            title: user.username,
            user: user,
            post: post,
            reply: reply,
            link: "/posts",
            additionalLink: ""
        });
    } catch(err){
        console.error(err);
    }
    
});

userRouter.get("/user/:username/currentuser/:currentuser", async (req, res) => {
    //If you are viewing your own profile, then you must be able to edit it.
    if (req.params.username === req.params.currentuser){
        try{
            const username = req.params.username;
            const user = await users.findOne({username: username});
            const post = await posts.findOne({username: username}, {sort: {postID: -1}});
            const reply = await replies.findOne({username: username}, {sort: {replyID: -1}});
            res.render("userwithedit", {
                title: user.username,
                user: user,
                post: post,
                reply: reply
            });
        } catch(err){
            console.error(err);
        }
    }
    else{
        try{
            const username = req.params.username;
            const user = await users.findOne({username: username});
            const post = await posts.findOne({username: username}, {sort: {postID: -1}});
            const reply = await replies.findOne({username: username}, {sort: {replyID: -1}});
            res.render("user", {
                title: "user",
                user: user,
                post: post,
                reply: reply,
                link: `/posts/currentuser/${req.params.currentuser}`,
                additionalLink: `/currentuser/${req.params.currentuser}`
            });
        } catch(err){
            console.error(err);
        }
    }
    
});

userRouter.post("/user/:username/upload", upload.single("image"),async (req, res) => {
    console.log("POST request received for /upload");
    const imagePath = req.file.path;
    console.log(imagePath);
    const newString = imagePath.replace("public", "static").replace(/\\/g, "/");
    try {
        const result = await users.updateOne({
            username: req.params.username
        },
        {$set: {
            photo: newString
        }});
        res.redirect(`/user/${req.params.username}/currentuser/${req.params.username}`)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

userRouter.post("/user/:username/edit", async (req, res) => {
    console.log("POST request received for /edit");
    console.log(req.body.description);
    try {
        const result = await users.updateOne({
            username: req.params.username
        },
        {$set: {
            description: req.body.description
        }});
        res.redirect(`/user/${req.params.username}/currentuser/${req.params.username}`)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default userRouter;
