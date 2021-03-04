const express = require('express');
const router = express.Router();
const homeController = require('../controllers/Home.controller');

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

router.post('/post/author/:id', homeController.post);
router.put('/post/:id/edit', homeController.editPost);
router.delete('/post/:id/delete', homeController.deletePost);
router.get('/logout', homeController.logout);
router.get('/', checkAuth, homeController.show);

module.exports = router;
