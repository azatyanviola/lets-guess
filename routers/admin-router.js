const router = require('express').Router();
const { AdminCtrl } = require('../controllers/admin-controller');

router.get('/home', AdminCtrl.getHome);
router.get('/login', AdminCtrl.getLogin);
router.post('/login', AdminCtrl.adminLogin);
router.post('/register', AdminCtrl.adminCreate);

module.exports = {
    router,
};
