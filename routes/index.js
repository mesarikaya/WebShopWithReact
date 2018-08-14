// server/routes/index.js

const contents = require(process.cwd() + '/server/routes/content.js');
// const article = require('./article')

// Disperse router to other function specific routers
module.exports = (router) => {
    // tslint:disable-next-line:no-console
    console.log("in the index router: ", router);
    contents(router);
    // article(router)
}
