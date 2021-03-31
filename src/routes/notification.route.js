const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/Notification.controller');

router.get('/detail/:id', notificationController.detailNotification);
router.post('/post', notificationController.handleFormPost);
router.get('/post', notificationController.showFormPost);
router.get('/display', notificationController.displayList);
router.get('/', notificationController.show);

module.exports = router;