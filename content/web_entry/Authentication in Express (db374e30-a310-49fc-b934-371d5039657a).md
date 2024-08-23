# Authentication in Express

Authentication is a crucial aspect of web application security, ensuring that only authorized users can access certain resources. In Express.js, you can implement authentication using various strategies, including sessions, JSON Web Tokens (JWT), and third-party authentication providers. This guide covers a basic implementation of authentication in an Express application with some security enhancements.

## Setting Up Authentication

### 1. Install Dependencies

First, install the necessary packages:

```bash
npm install express express-session passport passport-local bcryptjs dotenv helmet express-rate-limit csurf
```

### 2. Configure Passport

Create a `passport.js` file to configure Passport with a local strategy:

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assume you have a User model

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: 'Incorrect password.' });
    });
  });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, done));
```

### 3. Configure Express

Configure Express to use sessions and Passport for authentication:

```javascript
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/login', limiter);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, httpOnly: true, sameSite: 'strict' }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(csrf());
```

### 4. Create Routes for Authentication

Define routes for login and logout:

```javascript
app.post('/login', (req, res, next) => {
  // Input validation here
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});
```

### 5. Protect Routes

Use middleware to protect routes that require authentication:

```javascript
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

app.get('/protected', ensureAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route' });
});
```

This enhanced setup provides a more secure authentication system for an Express.js application. Remember to implement proper user registration with password hashing, add input validation, and ensure your application uses HTTPS in production.
