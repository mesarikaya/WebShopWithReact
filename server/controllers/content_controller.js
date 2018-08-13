'use strict';

var Contents = require('../models/content.js');
const fs = require('fs');

function handlePageContent() {
    // Get page content: All Images
    this.getAllImages = function (req, res) {
        var query = Contents.find({});
        query.exec(function (err, contents) {
            if (err) {
                return res.send("Error with image retrieval from database with error message:", err);
            }

            if (contents) {
                //console.log("stock exists. Do not add");
                // tslint:disable-next-line:no-console
                console.log("Contents are PULLLLEEEED");
                return res.json (contents);
            }
            else {
                //Send the error message 404 to indicate that no content could be received from the database collection
                return res.send("Unknown");
            }
        });
    };
}

module.exports = handlePageContent;