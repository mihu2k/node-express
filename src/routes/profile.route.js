const express = require('express');
const router = express.Router();
const profileController = require('../controllers/Profile.controller');

router.put('/:id/edit', profileController.edit);
router.get('/:id', profileController.show);

module.exports = router;