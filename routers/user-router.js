const userRt = require('express').Router();
const { UserCtrl } = require('../controllers/user-controller');

userRt.get('/home', UserCtrl.getHome);
userRt.get('/users', UserCtrl.getLogin);
userRt.post('/users', UserCtrl.userLogin);
userRt.post('/userRegister', UserCtrl.userCreate);

module.exports = {
    userRt,
};
