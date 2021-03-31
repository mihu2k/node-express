const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const Notification = require('../models/Notification.model');
const multiparty = require('multiparty');
const fs = require('fs');

class HomeController {
    // [GET] /
    async show(req, res, next) {
        const students = await User.find({ $or: [{userType: 'student'}, {userType: 'admin'}] });
        const getFourNotify = await Notification.find()
                                                .populate({ path: 'authorId', select: 'name' })
                                                .sort({ createdAt: -1 })
                                                .limit(4);
        res.render('home', {
            title: 'Home',
            user: req.user,
            userLogin: JSON.stringify(req.user),
            students: students,
            fourNotify: getFourNotify,
        });
    }

    // [GET] /post?page=x
    async showPaginatedPosts(req, res, next) {
        const page = req.query.page;
        const posts = await Post.find({}, null, {populate: [{path: 'authorId', select: 'avatar name'}, {path: 'comments', populate: {path: 'userCommentId', select: 'avatar name'}}] })
                                .sort({createdAt: -1})
                                .limit(10).skip((page - 1) * 10);
        return res.json(posts);
    }

    // [POST] /post/author/:id
    post(req, res, next) {
        const form = new multiparty.Form();
        
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).send({error: err.message});

            var image, video;
            files.image.forEach(file => {
                if (!file.originalFilename) {
                    image = '';
                } else {
                    fs.rename(file.path, './public/uploads/' + file.originalFilename, err => {
                        if (err) console.log(err);
                    })
                    image = '/uploads/' + file.originalFilename;
                }
            });

            if (!fields.video[0]) video = ''
            else video = fields.video[0].split('=')[1].slice(0, 11);  // Get videoId

            var formData = {
                authorId: req.params.id,
                content: fields.textarea[0],
                video: video,
                image: image,
            }

            Promise.all([User.findById(req.params.id), Post.create(formData)])
                .then(([author, post]) => res.json({ code: 200, message: 'Successfully!', dataPost: post, dataAuthor: author }))
                .catch(next);
        });
    }

    // [DELETE] /post/:id/delete
    deletePost(req, res, next) {
        if (req.params.id) {
            Post.deleteOne({ _id: req.params.id })
                .then(() => res.json({ code: 200, message: 'Delete success!'}))
                .catch(next);
        }
    }

    // [PUT] /post/:id/edit
    editPost(req, res, next) {
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).send({error: err.message});

            var image, video;
            files.imageEdit.forEach(file => {
                if (!file.originalFilename) {
                    image = '';
                } else {
                    fs.rename(file.path, './public/uploads/' + file.originalFilename, err => {
                        if (err) console.log(err);
                    });
                    image = '/uploads/' + file.originalFilename;
                }
            });

            if (!fields.videoEdit[0]) {
                video = '';
            } else if (fields.videoEdit[0].length == 11) {
                video = fields.videoEdit[0];
            }
            else {
                video = fields.videoEdit[0].split('=')[1].slice(0, 11);
            }

            var formData = {
                content: fields.textareaEdit[0],
                video,
                image,
            };

            await Post.updateOne({ _id: req.params.id }, formData)
            Post.findById(req.params.id).populate({path: 'authorId', select: 'avatar name'})
                .then(newPost => res.json({ code: 200, message: 'Edit successfully!', data: newPost }))
        });
    }

    // [POST] /comment/post/:postid/author/:id
    postComment(req, res, next) {
        const userCommentId = req.params.id;
        const postId = req.params.postid;
        const form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).send({ error: err.message });

            var data = {
                userCommentId: userCommentId,
                postId: postId,
                contentComment: fields.contentCmt[0],
            };

            const comment = await Comment.create(data)
            Post.updateOne({ _id: req.params.postid }, { $push: { comments: comment._id } })
                .then(() => {})
            Comment.findById(comment._id).populate({ path: 'userCommentId', select: 'avatar name' })
                .then((comment) => res.json(comment))
        });
    }

    // [DELETE] /comment/:id/delete
    async deleteComment(req, res, next) {
        if (req.params.id) {
            const cmt = await Comment.findById(req.params.id);
            await Post.updateOne({ _id: cmt.postId }, { $pull: { comments: req.params.id } });
            await Comment.deleteOne({ _id: req.params.id });
            return res.json({ code: 200, message: 'Comment deleted!' });
        }
    }

    // [GET] /logout
    logout(req, res) {
        req.logout();
        res.redirect('/auth/login');
    }
}

module.exports = new HomeController();