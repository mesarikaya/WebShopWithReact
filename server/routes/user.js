// server/routes/user.js

// Ingest the User controller
var UserController = require(process.cwd() + '/server/controllers/user_controller.js');

// Create the routes for user account calls
module.exports = (router, passport) => {

    // tslint:disable-next-line:no-console
    console.log("In user routing module");
    var userController = new UserController();

    // Create authentication check via using passport.js    
    function ensureAuthenticated(req, res, next) {
        // tslint:disable-next-line:no-console
        console.log("Authentications result is:", req.isAuthenticated());
        if (req.isAuthenticated()) {
            // If authentrication is successfull, do the next action
            return next();
        }
        else {
            //Warn the user about logged out status, and redirect to cover page
            // res.redirect('/flash');
            // tslint:disable-next-line:no-console
            console.log("Authentication failed");
        }
    }

    // Create safety for attempts to reach the /user interface without authentication
    /* router
        .route('/flash', )
        .get(function (req, res) {
                // Set a flash message by passing the key, followed by the value, to req.flash().
                // req.flash('info', 'Logged out or Unauthorized Log In Attempt. Please log in!');
                res.redirect('/');
            }
        );
    */

    // CREATE AUTHENTICATIONS FOR Google, Facebook, LinkedIn, Twitter and Github
    // Sel created authenticate
    // After sign up request, direct to home page for login
    router
        .route('/auth/sign-up')
        .post(passport.authenticate('auth/sign-up', {
                failureRedirect: '/',
                successRedirect: '/',
            })
        );

    // After lost-password request, direct to home page for login
    router
        .route('/auth/lost-password')
        .post(passport.authenticate('auth/lost-password', {
                failureRedirect: '/',
                successRedirect: '/',
            })
        );

    // Verify the user and redirect to startpage in case of success. In case of error send error.
    router
        .route('/verify/:email/:token')
        .get(function (req, res) {
            formHandler.verifyEmail(req, res);
        });

    // User sign-in
    router
        .route('/auth/sign-in')
        .post(passport.authenticate('auth/sign-in', { failureRedirect: '/', failureFlash: true }),
        function (req, res) {
                    // tslint:disable-next-line:no-console
                    console.log("Redirecting to the user account:", '/user/' + req.user.local_login.email);
                    res.redirect('/user/' + req.user.local_login.email);
                }
            );

    // GOOGLE AUTHENTICATE
    router
        .route('/auth/google')
        .get(passport.authenticate('google',
            {
                scope: [
                    'https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/plus.profile.emails.read'
                ]
            }
        ));

    // Google callback call
    router
        .route('/auth/google/callback')
        .get(passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' }),
            function (req, res) {
                res.redirect('/user');
            }
        );

    // FACEBOOK AUTHENTICATE   
    router
        .route('/auth/facebook')
        .get(passport.authenticate('facebook',
            {}
        ));

    // Facebook callback call
    router
        .route('/auth/facebook/callback')
        .get(passport.authenticate('facebook', { failureRedirect: '/' }),
            function (req, res) {
                res.redirect('/');
            }
        );

    //LOGOUT - After logout go back to opening page
    router
        .route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });

    //Direct to home page
    /*router
        .route('/')
        .get(function (req, res) {
            res.render(process.cwd() + '/Public/views/cover.ejs', { messages: req.flash('info'), signupMessage: req.flash('signupMessage') });
        });*/

    //Direct to user page
    router
        .route('/user/:username')
        .get(ensureAuthenticated, function (req, res) {
            res.sendFile(process.cwd() + '/Public/views/user.html');
        });
};