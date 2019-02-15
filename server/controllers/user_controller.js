'use strict';
var users = require('../models/user.js');
var contents = require('../models/content.js');

// Service that handles the the user info related tasks on the webpage

// Just as a starting point a function is introduced for future use if needed
function handleUserInfo() {
    // For now no specific functionalities to

    // Add new favorites to the user if possible
    this.modifyFavorites = function (req, res) {
        // Set the parameters
        let author = req.query.Author;
        let description = req.query.Description;
        let group = req.query.Group;
        let image = req.query.Image;
        let imageId = req.query.ImageId;
        let name = req.query.Name;
        let reserved = req.query.Reserved;
        let reservedUntil = req.query.ReservedUntil;
        let type = req.query.Type;
        let action = req.query.action;
        let userId = req.query.UserId;

        // tslint:disable-next-line:no-console
        console.log("In the add to favorites controller function: ", req.query, "Action is:", action);

        // SEarch if user has the producID already in favorites
        let userQuery = users.findOne({ 'local_login.email': userId, 'favorites.ImageId': imageId });

        return new Promise((resolve, reject) => {

            // if the user has it then do nothing otherwise add
            userQuery.exec(function (err, userDoc) {
                if (err) {
                    // Send error message due to connection issue
                    // return res.status(503).send({ "result": userErr + "server connection issue" });
                    reject(err);
                }

                if (userDoc) {
                    if (action === "delete") {
                        resolve([userId, "delete"]);
                    } else {
                        reject(new Error("Record already exists"));
                    }
                } else {
                    if (action === "delete") {
                        reject(new Error("No such favorite document exists"));
                    } else {
                        resolve([userId, "add"]);
                    }
                }
            });
        }).then(request => {
            // tslint:disable-next-line:no-console
            console.log("Request is:", request);
            const userID = request[0];
            const actionType = request[1];
            // tslint:disable-next-line:no-console
            console.log("Inside the then:", userID);
            let user = users.findOne({ 'local_login.email': userID });

            user.exec(function (userErr, doc) {
                if (userErr) {
                    // Send error message due to connection issue
                    // return res.status(503).send({ "result": userErr + "server connection issue" });
                    reject(userErr);
                }

                // If user exists
                if (doc) {
                    

                    // Check if this is a Delete or Add Action
                    if (actionType === "add") {
                        doc.favorites.push({
                            Author: author,
                            Description: description,
                            Group: group,
                            Image: image,
                            ImageId: imageId,
                            Name: name,
                            Reserved: reserved,
                            Reserved_Until: reservedUntil,
                            Type: type
                        });

                        
                    } else { // Then delete action is requested
                        // tslint:disable-next-line:no-console
                        console.log("favorites is:", doc.favorites);

                        // tslint:disable-next-line:no-console
                        console.log("Delete the id", imageId);
                        doc.favorites = doc.favorites.filter(function (item) {
                            // tslint:disable-next-line:no-console
                            console.log("Checking: ", item.ImageId, "against: ", imageId, "Equal?", item.ImageId.toString() !== imageId.toString());
                            return item.ImageId.toString() !== imageId.toString();
                        });
                        // tslint:disable-next-line:no-console
                        console.log("Favorites after deletion", doc.favorites);
                    }
                    // tslint:disable-next-line:no-console
                    console.log("Favorites after deletion 2", doc.favorites);
                    doc.markModified('favorites');
                    doc.save(function (err, result) {
                        if (err) { throw err; }
                        // tslint:disable-next-line:no-console
                        console.log("Update is successful. Saved document: ", result);
                    });
                    

                        
                    return res.status(200).json({ "result": doc.favorites });
                    /*
                    // tslint:disable-next-line:no-console
                    console.log("Image url is: ", favorites, "----", imageUrl);
                    let recordExists = false;
                    for (let i = 0; i < favorites.length; i++) {
                        // tslint:disable-next-line:no-console
                        console.log("Checking favorites --> i:", i + " and " + favorites[i]);
                        if (favorites[i].contentId === productId) {
                            recordExists = true;
                            break;
                        }
                    }

                    if (recordExists) {
                        favorites.markModified('place_data.liked_places');
                        favorites.push({
                            contentId: productId,
                            image: imageUrl,
                            productDecription: productDecription,
                            productName: productName
                        });
                    }
                    // tslint:disable-next-line:no-console
                    console.log("favorites is", favorites);
                    return res.status(202).json({ "result": "Change is successful" });
                } 
                }*/
                } else {
                    return res.status(501).json({ "result": "No such userDoc" });
                }
            });

        }).catch(error => {
            // Handle errors of asyncFunc1() and asyncFunc2()
            // tslint:disable-next-line:no-console
            console.log('An error occurred', error);
            return res.status(501).json({ "result": error });
        });        
    };
}

module.exports = handleUserInfo;