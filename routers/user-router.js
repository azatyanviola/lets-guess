const userRt = require('express').Router();
const { UserCtrl } = require('../controllers/user-controller');

userRt.get('/home', UserCtrl.getHome);
userRt.get('/users', UserCtrl.getLogin);
userRt.post('/users', UserCtrl.userLogin);
userRt.get('/user-register', UserCtrl.getRegister);
userRt.post('/user-register', UserCtrl.userCreate);

module.exports = {
    userRt,
};
