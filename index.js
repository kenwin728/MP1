import { dirname } from "path";
import { fileURLToPath } from 'url';
// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';
// Routes modules
import router from "./src/routes/index.js";
// Database modules
import { connectToMongo } from "./src/db/conn.js";
import bodyParser from "body-parser";
import { mergeArrays } from './src/helpers/customHelpers.js';
import handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';
import { getDb } from './src/db/conn.js';
import bcrypt from 'bcrypt';

async function main () {
    const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
    const app = express();
    const SALT_WORK_FACTOR = 10;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/static", express.static(__dirname + "/public"));
    // Set handlebars as the express app's default view engine
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        helpers: { mergeArrays }
    }));
    handlebarsHelpers({handlebars});
    app.set("view engine", "hbs");
    // directory for views folder
    app.set("views", "./src/views");
    // View cache to false
    app.set("view cache", false);

    // from this point onwards, we are going to receive json format data
    app.use(express.json());

    app.use(router);

    app.listen(process.env.PORT, () => {
        console.log("Express app now listening...");
        connectToMongo((err) => {
            if (err) {
                console.error("An error has occurred:");
                console.error(err);
                return;
            }
            console.log("Connected to Mongodb");
        });
        const db = getDb();
        const users = db.collection("users");
        const posts = db.collection("posts");
        const replies = db.collection("replies");
        async function populateDB(){
            const insertFiveUsers = await users.insertMany([{
                username: "Josh", 
                password: await bcrypt.hash("josh123", await bcrypt.genSalt(SALT_WORK_FACTOR)),
                description: "",
                photo: "",
                numberofposts: 1
            },{
                username: "Kenwin", 
                password: await bcrypt.hash("kenwin123", await bcrypt.genSalt(SALT_WORK_FACTOR)),
                description: "",
                photo: "",
                numberofposts: 1
            },{
                username: "Marcus", 
                password: await bcrypt.hash("marcus123", await bcrypt.genSalt(SALT_WORK_FACTOR)),
                description: "",
                photo: "",
                numberofposts: 1
            },{
                username: "Johnson", 
                password: await bcrypt.hash("johnson123", await bcrypt.genSalt(SALT_WORK_FACTOR)),
                description: "",
                photo: "",
                numberofposts: 1
            },{
                username: "Bob", 
                password: await bcrypt.hash("bob123", await bcrypt.genSalt(SALT_WORK_FACTOR)),
                description: "",
                photo: "",
                numberofposts: 1
            }]);
            const insertFivePosts = await posts.insertMany([{
                username: "Josh", 
                title: "Is CCAPDEV hard?",
                content: "Is CCAPDEV really hard?",
                date: "08/5/2023",
                postID: 1,
                downvote: 0,
                upvote: 0,
                views: 0,
                replies: 1
            },{
                username: "Kenwin", 
                title: "Is STALGCM hard?",
                content: "Is STALGCM really hard?",
                date: "08/5/2023",
                postID: 2,
                downvote: 0,
                upvote: 0,
                views: 0,
                replies: 1
            },{
                username: "Marcus", 
                title: "Is ST-MATH hard?",
                content: "Is ST-MATH really hard?",
                date: "08/5/2023",
                postID: 3,
                downvote: 0,
                upvote: 0,
                views: 0,
                replies: 1
            },{
                username: "Johnson", 
                title: "Is GELITPH hard?",
                content: "Is GELITPH really hard?",
                date: "08/5/2023",
                postID: 4,
                downvote: 0,
                upvote: 0,
                views: 0,
                replies: 1
            },{
                username: "Bob", 
                title: "Is LCFAITH hard?",
                content: "Is LCFAITH really hard?",
                date: "08/5/2023",
                postID: 5,
                downvote: 0,
                upvote: 0,
                views: 0,
                replies: 1
            }]);
            const insertFiveReplies = await replies.insertMany([{
                username: "Josh", 
                content: "Yes",
                date: "08/5/2023",
                postID: 2,
                downvote: 0,
                upvote: 0,
                replyID: 1
            },{
                username: "Kenwin", 
                content: "No",
                date: "08/5/2023",
                postID: 3,
                downvote: 0,
                upvote: 0,
                replyID: 2
            },{
                username: "Marcus", 
                content: "Somehow",
                date: "08/5/2023",
                postID: 4,
                downvote: 0,
                upvote: 0,
                replyID: 3
            },{
                username: "Johnson", 
                content: "Not really",
                date: "08/5/2023",
                postID: 5,
                downvote: 0,
                upvote: 0,
                replyID: 4
            },{
                username: "Bob", 
                content: "Maybe",
                date: "08/5/2023",
                postID: 1,
                downvote: 0,
                upvote: 0,
                replyID: 5
            }]);
        }
        populateDB();
    });
}

main();