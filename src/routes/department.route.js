const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/Department.controller');

router.patch('/change-password', departmentController.update);
router.get('/change-password', departmentController.showChangePassword);

module.exports = router;