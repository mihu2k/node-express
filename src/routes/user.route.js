const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller')

router.get('/create', userController.create);
router.post('/storage', userController.storage);
router.get('/:id/authorized', userController.authorized);
router.put('/:id', userController.update);
router.get('/', userController.show);

module.exports = router;