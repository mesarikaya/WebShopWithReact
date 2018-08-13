// server/routes/content.js
var ImageController = require(process.cwd() + '/server/controllers/content_controller.js');
//const multipart = require('connect-multiparty')
//const multipartWare = multipart()
module.exports = (router) => {
    /**
     * get all articles
     */
    // tslint:disable-next-line:no-console
    console.log("Trying to reach the GET");
    var imageController = new ImageController();
    router
        .route('/images')
        .get(function (req, res) {
            // tslint:disable-next-line:no-console
            console.log("Called the GET");
            imageController.getAllImages(req, res);
        });
};