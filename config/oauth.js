'use strict';

module.exports = {
  'googleAuth': {
	'clientID': process.env.GOOGLE_CLIENTID,
	'clientSecret': process.env.GOOGLE_SECRET,
	'callbackURL': process.env.APP_URL + 'auth/google/callback'
  },
  'facebookAuth': {
    'clientID': process.env.FACEBOOK_CLIENTID,
    'clientSecret': process.env.FACEBOOK_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/facebook/callback'
  }
};