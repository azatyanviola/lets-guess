const adminsRouter = require('express').Router();
const { AdminsCtrl } = require('../controllers/admins-controller');

//   //adminsRouter.get('/admin/login', AdminsCtrl.getLogin);
adminsRouter.post('/admin/login', AdminsCtrl.adminLogin);
adminsRouter.post('/admin/register', AdminsCtrl.adminCreate);

module.exports = adminsRouter;
