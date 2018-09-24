// server/routes/content.js
var ImageController = require(process.cwd() + '/server/controllers/content_controller.js');
//const multipart = require('connect-multiparty')
//const multipartWare = multipart()
module.exports = (router) => {
    /**
     * get all articles
     */
    // tslint:disable-next-line:no-console
    // console.log("Trying to reach the GET");
    var imageController = new ImageController();
    router
        .route('/images')
            .get(function (req, res) {
                // tslint:disable-next-line:no-console
                console.log("Called the GET with type:", req.query.searchType);
                let searchType = req.query.searchType;

                // Check if search types are in expected types
                // And just present all the content if not
                let expectedTypes = ['allItems', 'Books', 'Puzzles', 'Toys', 'Smart Toys'];

                if (expectedTypes.includes(searchType)) {
                    if (searchType === "allItems") {
                        // tslint:disable-next-line:no-console
                        console.log("Calling AllItems");
                        imageController.getImages(req, res, null);
                    } else {
                        // tslint:disable-next-line:no-console
                        console.log("Calling the REST");
                        imageController.getImages(req, res, searchType);
                    }
                } else { // The requested content is not found, just share the full content
                    // tslint:disable-next-line:no-console
                    console.log("Calling AllItems");
                    imageController.getImages(req, res, null);
                }   
            });

    /* router('/product')
        .get(function () { }); */
 
};