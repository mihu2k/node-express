const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/Notification.controller');

router.post('/me/edit/:id', notificationController.editNotification);
router.get('/me/edit/ajax/:id', notificationController.getDataAjax);
router.get('/me/edit/:id', notificationController.displayForm);
router.delete('/me/delete/:id', notificationController.deleteNotification);
router.get('/me', notificationController.showYourNotification);
router.get('/detail/:id', notificationController.detailNotification);
router.post('/post', notificationController.handleFormPost);
router.get('/post', notificationController.showFormPost);
router.get('/display', notificationController.displayList);
router.get('/', notificationController.show);

module.exports = router;