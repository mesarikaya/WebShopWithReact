'use strict';
// server/app.js

/** require dependencies */
const express = require("express");
const routes = require('./server/routes/index');
const flash = require('connect-flash');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require("path");
const app = express();
const router = express.Router();
//Introduce packages for oAuth
const passport = require('passport');
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/sharing_app";

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
        useNewUrlParser: true
    });
} catch (error) {
    throw new Error("Error in connecting the database server");

}

let port = 5000 || process.env.PORT;

/** set up Oauth package to the app and load the Environment variables */
require('dotenv').load();
require('./config/passport')(passport);

/** set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
// app.use('/static',express.static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);
// tslint:disable-next-line:no-console
// console.log('App routes are', app.routes);
/** start server */

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at port: ${port}`);
});

/** set up routes {API Endpoints} */
routes(router, passport);

/* 'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port); */
