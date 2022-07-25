
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const mongoose = require('mongoose');

(async () => {
    await mongoose.connect('mongodb://localhost:27017/lets-guess');
})();

const cookieParser = require('cookie-parser');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./controllers/config');

passport.use(new Strategy(jwt, ((jwtPayload, done) => {
    if (jwtPayload !== void 0) {
        return done(false, jwtPayload);
    }
    done();
})));

app.use(express.urlencoded({ extended: false }));

const { router } = require('./routers/admin-router');
app.use('/', router);

app.use(express.json());

app.use(cookieParser());
app.use(express.static('client/views'));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

