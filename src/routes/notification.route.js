const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/Notification.controller');
const { isNotStudent, isAdmin } = require('../lib/middleware');

router.post('/me/edit/:id', isNotStudent, notificationController.editNotification);
router.get('/me/edit/ajax/:id', isNotStudent, notificationController.getDataAjax);
router.get('/me/edit/:id', isNotStudent, notificationController.displayForm);
router.delete('/me/delete/:id', isNotStudent, notificationController.deleteNotification);
router.get('/me', isNotStudent, notificationController.showYourNotification);
router.get('/detail/:id', notificationController.detailNotification);
router.post('/post', isNotStudent, notificationController.handleFormPost);
router.get('/post', isNotStudent, notificationController.showFormPost);
router.get('/display', notificationController.displayList);
router.get('/', notificationController.show);

module.exports = router;