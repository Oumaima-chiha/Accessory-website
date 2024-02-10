const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Unauthorized } = require('http-errors');
const { PrismaClient } = require('@prisma/client');
const { verify } = require('jsonwebtoken');
const prisma = new PrismaClient();

// Define options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_BO_USER_ACCESS_TOKEN_SECRET_KEY,
  ignoreExpiration: false,
};

// Configure JWT strategy
passport.use(
  'backoffice',
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Retrieve back office user from database based on payload sub (subject)
      const user = await prisma.backOfficeUser.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        return done(null, false);
      }

      // If user is found, return it
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Middleware function to authenticate back office users using JWT
function authenticateBackoffice(req, res, next) {
  passport.authenticate('backoffice', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new Unauthorized('Unauthorized'));
    }
    // Attach the authenticated user to the request object
    req.user = user;
    next();
  })(req, res, next);
}
// Middleware function for refresh token guard
function refreshTokenGuard(req, res, next) {
  // Extract the refresh token from the request body, query parameters, or headers
  const refreshToken = req.body.refreshToken || req.query.refreshToken || req.headers['x-refresh-token'];

  // Check if a refresh token is provided
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not provided' });
  }

  try {
    // Verify the refresh token
    // If verification succeeds, attach the decoded payload to the request object
    req.refreshTokenPayload = verify(refreshToken, process.env.JWT_BO_USER_REFRESH_TOKEN_SECRET_KEY);
    next();
  } catch (error) {
    // If verification fails, handle the error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired' });
    } else {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  }
}
module.exports = {authenticateBackoffice,refreshTokenGuard};
