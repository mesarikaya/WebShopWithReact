// server/routes/index.js
// tslint:disable-next-line:no-console
console.log("in the index router: ", router);
const contents = require(process.cwd() + '/server/routes/content.js');
// const article = require('./article')
module.exports = (router) => {
    // tslint:disable-next-line:no-console
    console.log("in the index router: ", router);
    contents(router)
    // article(router)
}
