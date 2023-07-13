const sessions = require('express-session');
const config = require('../config')
// Middleware for session management
module.exports = sessions({
    secret: config.secret, // Secret key for session encryption (change it to your own secret)
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set it to true if using HTTPS
      httpOnly: false,
      maxAge: 3600000, // Session duration (in milliseconds), e.g., 1 hour
      sameSite: false,
    }
})