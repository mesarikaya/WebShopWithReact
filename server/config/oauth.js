'use strict';
// Set the oAuth parameters from .env file
module.exports = {
  
    'facebookAuth': {
        'callbackURL': process.env.APP_URL + 'auth/facebook/callback',
        'clientID': process.env.FACEBOOK_CLIENTID,
        'clientSecret': process.env.FACEBOOK_SECRET    
    },
    'googleAuth': {
        'callbackURL': process.env.APP_URL + 'auth/google/callback',
        'clientID': process.env.GOOGLE_CLIENTID,
        'clientSecret': process.env.GOOGLE_SECRET
    }
};