'use strict';
// server/app.js

/** require dependencies */
const express = require("express");
const session = require('express-session');
const app = express();
const routes = require('./server/routes/index');
const flash = require('connect-flash');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require("path");

const router = express.Router();
//Introduce packages for oAuth
const passport = require('passport');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/sharing_app";

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
    mongoose.Promise = global.Promise;
} catch (error) {
    throw new Error("Error in connecting the database server");
}

// Create a store tp put the mongodb store in and make it a part of session
var store = new MongoDBStore(
    {
        uri: url,
    }
);

let port = 5000 || process.env.PORT;

/** set up Oauth package to the app and load the Environment variables */
require('dotenv').load();

/** set up middlewares */
const corsOptions = { credentials: true, origin: 'http://localhost:3000' };
app.use("*",cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* app.use(cookieParser(process.env.cookieParsersecret));

// Set the session
var sessionMiddleware = session({
    cookie: {
        maxAge: new Date(Date.now() + 60 * 1000),
        secure: "auto",
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.cookieParsersecret,
    store: store
});


app.use(sessionMiddleware); */

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

require('./server/passport/index')(passport);
app.use('/api', router);

/** set up routes {API Endpoints} */
routes(router, passport);

/** start server */
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at port: ${port}`);
});


