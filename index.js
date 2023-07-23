// System-related packages
import "dotenv/config";
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

async function main () {
    const __dirname = dirname(fileURLToPath(import.meta.url)); // directory URL
    const app = express();
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

    app.listen(process.env.SERVER_PORT, () => {
        console.log("Express app now listening...");
        connectToMongo((err) => {
            if (err) {
                console.error("An error has occurred:");
                console.error(err);
                return;
            }
            console.log("Connected to Mongodb");
        });
    });
}

main();