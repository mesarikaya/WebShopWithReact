'use strict';

var contents = require('../models/content.js');
const fs = require('fs');


function handlePageContent() {
    // Initiate page content data as Null

    // Get page content: All Images
    this.getAllImages = function (req, res) {
        var query = contents.find({});
        query.exec(function (err, doc) {
            if (err) {
                // Send error message due to connection issue
                return res.status(503).send({ "result": err + "server connection issue" });
            }

            if (contents) {
                //console.log("stock exists. Do not add");
                // tslint:disable-next-line:no-console
                console.log("Contents are PULLLLEEEED");
                return res.status(200).json({ "result": doc });
            }else {
                // No content is found
                return res.status(200).send({"result": "No data"});
            }
        });
    };
}

module.exports = handlePageContent;