'use strict';

var contents = require('../models/user.js');
const fs = require('fs');

function handleUserInfo() {
    // Initiate page content data as Null
    // tslint:disable-next-line:no-console

    // Get page content: By Type
    this.getImages = function (req, res, type) {
        // tslint:disable-next-line:no-console
        console.log("In the get images function: ", type);

        // Retrieve the related age group
        let ageGroup = req.query.ageGroup;

        let query = contents.find({}); // Set default serach to all images
        if (type === null) {
            // tslint:disable-next-line:no-console
            console.log("In the null: ", type);
            query = contents.find({});
        } else if (type === "Smart Toys") {
            // tslint:disable-next-line:no-console
            console.log("All contents are pulled with type: ", type);
            query = contents.find({ 'Type': type });
        } else {
            // tslint:disable-next-line:no-console
            console.log("All contents are pulled with type: ", type);
            if (ageGroup === "All") {
                query = contents.find({ 'Type': type });
            } else {
                query = contents.find({ 'Type': type, 'Group': ageGroup });
            }
        }

        query.exec(function (err, doc) {
            if (err) {
                // Send error message due to connection issue
                return res.status(503).send({ "result": err + "server connection issue" });
            }

            if (contents) {
                return res.status(200).json({ "result": doc });
            } else {
                // No content is found
                return res.status(200).send({ "result": "No data" });
            }
        });
    };
}

module.exports = handleUserInfo;