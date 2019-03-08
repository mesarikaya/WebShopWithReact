'use strict';
// server/app.js

/** require dependencies */
const express = require("express");
const session = require('express-session');
const app = express();
const routes = require('./src/server/routes/index');
const flash = require('connect-flash');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require("path");
const router = express.Router();

/** set up Oauth package to the app and load the Environment variables */
require('dotenv').load();

/** set up middlewares */
// Set cors availability
const corsOptions = { credentials: true, origin: 'http://localhost:3000' };
app.use("*", cors(corsOptions));

// Introduce passportjs for local storage token management
const passport = require('passport');

// Create Mongoose connection with existing mongodb schema
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/sharing_app";

// tslint:disable-next-line:no-console
console.log(`connected to mongodb:`, url);

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
    mongoose.Promise = global.Promise;
    // tslint:disable-next-line:no-console
    console.log(`connected to mongodb:`, url);
} catch (error) {
    throw new Error("Error in connecting the database server");
}



// Add helmet to protect for general attacks
app.use(helmet());

// Add body parser for proper body parsing for posting
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize passport and session
app.use(passport.initialize());

// Serialize and deserialize the local storage session
require('./src/server/passport/index')(passport);

// Set all the /api/* routes extension for the nodejs backend server calls
app.use('/api', router);

/** set up routes {API Endpoints} */
routes(router, passport);

/*
// serve the _current directory from where the script is running
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

let port = 5000 || process.env.PORT;

/** start server */
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at port: ${port}`);
});


