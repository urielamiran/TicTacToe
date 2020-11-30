
const express = require('express');
const router = express.Router();
const passport = require('passport');
const debug = require('debug')('app:users');
const bcrypt = require('bcryptjs');
const User = require('../model')('User');

router.post('/login',
    (req, res, next) => {
       debug(`Here with: ${req.body}, or: ${JSON.stringify(req.body)}`);
       if (req.isAuthenticated()) {
         debug('auth')
         let user = {firstName: req.user.firstName, email: req.user.email};
         res.send(user);
       }
       else if (!req.body.password) {
         debug('no password')
         res.sendStatus(401);
       }
       else {
         debug('next')
          next();
       }
    },
    passport.authenticate('local'),
    (req, res) => {

        let user = {firstName: req.user.firstName, email: req.user.email, type: req.user.type};
 
        res.send(user);
    }
)

router.post('/register',
    (req, res, next) => {
       if (req.isAuthenticated()) {
         res.sendStatus(200);
       }
       else {
          next();
       }
    },
    async (req, res) => {
      debug(`${req.path} is requested`);
      try {
  
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          await User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hashedPassword
          });
          debug(`New user registered. Name: ${req.body.firstName}, ${req.body.lastName} ,email: ${req.body.email}`);
          res.sendStatus(200);
      } catch (error) {
        console.log(error)
          debug(`Error: ${error}`);
      }

    }
)

router.get('/user', (req, res) => {
    let user;
    if (req.user) {
      user = { firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email }
    }
    res.send(user);
});

router.get('/logout', (req, res) => {
  
  req.session.destroy(()=>{
   req.logout();
  })
});




module.exports = router;
