require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('./controllers/config');
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { jwt } = require('./controllers/config');
const questionRt = require('./routers/adminRouter');

(async() => {
    await mongoose.connect('mongodb://localhost:27017/lets-guess');
})();

passport.use(new Strategy(jwt, ((jwtPayload, done) => {
    if (jwtPayload !== void 0) {
        return done(false, jwtPayload);
    }
    done();
})));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/admin', questionRt);

const { router } = require('./routers/admin-router');
app.use('/', router);

const { userRt } = require('./routers/user-router');
app.use('/', userRt);

app.use(cookieParser());
app.use(express.static('client/views'));

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});