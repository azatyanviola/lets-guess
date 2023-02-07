const usersRt = require('express').Router();
const { UsersCtrl } = require('../controllers/users-controller');

usersRt.get('/users/:id', UsersCtrl.getOneUser);
usersRt.get('/users', UsersCtrl.getUsers);
usersRt.post('/users', UsersCtrl.userLogin);
usersRt.post('/user-register', UsersCtrl.userCreate);

module.exports = usersRt;
