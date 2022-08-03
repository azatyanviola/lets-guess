const usersRt = require('express').Router();
const { UsersCtrl } = require('../controllers/users-controller');

usersRt.get('/home', UsersCtrl.getHome);
usersRt.get('/users', UsersCtrl.getLoginPage);
usersRt.post('/users', UsersCtrl.userLogin);
usersRt.get('/user-register', UsersCtrl.getRegister);
usersRt.post('/user-register', UsersCtrl.userCreate);

module.exports = usersRt;
