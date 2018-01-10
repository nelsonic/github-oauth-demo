'use strict';

var JWT = require('jsonwebtoken'); // session stored as a JWT cookie

module.exports = function custom_handler (req, reply, tokens, profile) {
  var session, token;

  if (profile) {
    // console.log(JSON.stringify(tokens, null, 2));
    // console.log(JSON.stringify(profile, null, 2));
    // extract the relevant data from Profile to store in JWT object
    session = {
      fistname: profile.name,    // the person's name e.g: Anita
      image: profile.avatar_url, // profile image url
      id: profile.id,            // their github id
      agent: req.headers['user-agent']
    };
    // create a JWT to set as the cookie:
    token = JWT.sign(session, process.env.JWT_SECRET);

    // reply to client with a view
    return reply('Hello ' + profile.name + ', You Logged in Using GitHub!')
    .state('token', token); // see: http://hapijs.com/tutorials/cookies
  }

  return reply('Sorry, something went wrong, please try again.').code(401);
};
