/**
 * Created by Mihnea on 5/2/2015.
 */
var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(morgan('dev'));

    // Good for now
    // In the future, use connect-mongo or similar
    // for persistant sessions
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(session({secret: 'disertation server', saveUninitialized: true, resave: true}));


    //// Expose session to views
    //app.use(function (req, res, next) {
    //    if (req.user) {
    //        req.locals.isLoggedIn = req.session.isLoggedIn;
    //        req.locals.member = req.session.member;
    //    }
    //    next();
    //})
}