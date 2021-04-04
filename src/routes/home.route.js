const express = require('express');
const router = express.Router();
const homeController = require('../controllers/Home.controller');
const { checkAuth } = require('../lib/middleware');

router.post('/comment/post/:postid/author/:id', homeController.postComment);
router.delete('/comment/:id/delete', homeController.deleteComment);
router.post('/post/author/:id', homeController.post);
router.put('/post/:id/edit', homeController.editPost);
router.delete('/post/:id/delete', homeController.deletePost);
router.get('/post', homeController.showPaginatedPosts);
router.get('/logout', homeController.logout);
router.get('/', checkAuth, homeController.show);

module.exports = router;
