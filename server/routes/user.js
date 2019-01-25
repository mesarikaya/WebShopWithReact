﻿
// Ingest the User controller
const UserController = require(process.cwd() + '/server/controllers/user_controller.js');
const HandleSubscription = require('../config/commonfunctions/handleSubscription');
const ErrorHandler = require('../config/commonfunctions/errorHandling');
const jwt = require("jsonwebtoken");
// const passport = require('../passport');

// Create the routes for user account calls
module.exports = (router, passport) => {

    // tslint:disable-next-line:no-console
    console.log("In user routing module");
    var userController = new UserController();
    var handleSubscription = new HandleSubscription();
    var errorHandler = new ErrorHandler();

    // Create authentication check via using passport.js    
    function ensureAuthenticated(req, res, next) {
        // tslint:disable-next-line:no-console
        console.log("Logout session id", session.id);

        // tslint:disable-next-line:no-console
        console.log("Authentications result is:", req.isAuthenticated());
        if (req.isAuthenticated()) {
            // If authentrication is successfull, do the next action
            return next();
        }
        else {
            // Warn the user about logged out status, and redirect to cover page
            // res.redirect('/flash');
            // tslint:disable-next-line:no-console
            console.log("Authentication failed");
            res.redirect('/');
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
    
    router
        .route('/auth')
        .get((req, res, next) => {
            // tslint:disable-next-line:no-console
            console.log('===== user!!======')

            // tslint:disable-next-line:no-console
            console.log(req.user)
            if (req.user) {
                res.json({ user: req.user })
            } else {
                res.json({ user: null })
            }
        });

    // CREATE AUTHENTICATIONS FOR Google, Facebook, LinkedIn, Twitter and Github
    // Sel created authenticate
    // After sign up request, direct to home page for login
    router
        .route('/auth/sign-up')
        .post((req, res, next) => {
            return passport.authenticate('local-signup', (err, user) => {
                errorHandler.sendErrorDetails(err, res);
            })(req, res, next);
        });

    // Verify the user and redirect to startpage in case of success. In case of error send error.
    router
        .route('/verify')
        .get((req, res) => {
            // tslint:disable-next-line:no-console
            console.log("Enter the verification side");

            // tslint:disable-next-line:no-console
            console.log("Called the GET with type:", req.query);

            handleSubscription.verifyEmail(req, res);
        });

    // User sign-in
    router
        .route('/auth/sign-in')
        .post((req, res, next) => {
            return passport.authenticate('local-signin', (err, user, token) => {
                // Check if the usser credentials are correct. 
                // If so, send the user verification result JSON to update the app state

                // Log in to the session and serialize the user
                req.logIn(user, function (loginErr) {
                    if (loginErr) {
                        return res.status(500).json({ message: "Login failed with error => " + loginErr });
                    }

                    // tslint:disable-next-line:no-console
                    console.log("Token is:", token);

                    const result = errorHandler.sendErrorDetails(err, res);
                    if (result.success) {

                        // tslint:disable-next-line:no-console
                        console.log("JWT authenticated? and user -->", user);

                        return res.status(200).json({
                            result: {
                                message: "User signed in",
                                token: token,
                                userVerified: user.local_login.isVerified,
                                username: user.local_login.email,
                            }
                            
                        });

                    } else {
                        return res.status(400).json(result);
                    }
                });

            })(req, res, next);
        });

    //LOGOUT - After logout go back to opening page
    router
        .route('/auth/sign-out')
        .get(function (req, res) {

            // if (req.isAuthenticated()) {
                req.logOut();
                // tslint:disable-next-line:no-console
                console.log("Logging out from the user session2", req.session);
                
                return res.status(200).json({
                    "result": {
                        "message": "User signed out!",
                        "username": "guest"
                    }
                });
            // }

            /* return res.status(401).json({
                "result": {
                    "message": "No authenticated user to log out!",
                    "username": "guest"
                }
            }); */

        });

    // After lost-password request, direct to home page for login
    router
        .route('/auth/lost-password')
        .post(passport.authenticate('auth/lost-password', {
                failureRedirect: '/',
                successRedirect: '/',
            })
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
                // tslint:disable-next-line:no-console
                console.log("Google sign in success");
                res.redirect('/');
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



};