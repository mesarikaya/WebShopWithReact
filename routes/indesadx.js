// server/routes/index.js

const contents = require(process.cwd() + '/server/routes/content.js');
const users = require(process.cwd() + '/server/routes/user.js');

module.exports = (router, passport) => {
    // tslint:disable-next-line:no-console
    // console.log("in the index router: ", router);
    contents(router);
    users(router, passport);
    // article(router)
};