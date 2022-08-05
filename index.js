require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('./controllers/config');
const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { jwt } = require('./controllers/config');
const path = require('path');

const db = {
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};

(async () => {
    await mongoose.connect(db.url);
})();

app.use(cors({
    origin: '*'
}));

passport.use(new Strategy(jwt, ((jwtPayload, done) => {
    if (jwtPayload !== void 0) {
        return done(false, jwtPayload);
    }
    done();
})));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const questionsRt = require('./routers/questions-router');
app.use('/', questionsRt);
const adminsRouter = require('./routers/admins-router');
app.use('/', adminsRouter);
const usersRt = require('./routers/users-router');
app.use('/', usersRt);

// const { playRt } = require('./routers/play-router');
// app.use('/play', playRt);
app.set('view engine', 'ejs');
app.use(cookieParser());
// app.use(express.static('client/views'));
app.get('/', async (req, res) => {
    await res.sendFile(path.resolve('client/views/first-page.html'));
});

app.get('/play', (req, res) => {
    res.render('play');
});

app.get('/testapi', (req, res) => {
    console.log('testapi')
    res.end(JSON.stringify({test: 'test string'}));
});

app.post('/register', (req, res) => {
    console.log('req ', req.body)
    res.end(JSON.stringify({test: 'test string'}))
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
