
const env = require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const mongoose = require('mongoose');

(async () => {
    await mongoose.connect('mongodb://localhost:27017/lets-guess');
})();

app.use(express.static('.'));

const cookieParser = require('cookie-parser');
const config = require('./server/config');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./server/config');

passport.use(new Strategy(jwt, ((jwt_payload, done) => {
    if (jwt_payload !== void 0) {
        return done(false, jwt_payload);
    }
    done();
})));

app.use(express.urlencoded());

app.use(express.json());

app.use(cookieParser());
app.use(express.static('client/views'));

require('./server/admin-user-router')(app);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

