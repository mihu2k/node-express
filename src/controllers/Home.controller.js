const User = require('../models/User.model');
const Post = require('../models/Post.model');
const multiparty = require('multiparty');
const fs = require('fs');

class HomeController {
    // [GET] /
    async show(req, res, next) {
        const posts = await Post.find({}, null, {populate: {path: 'authorId', select: 'avatar name'}}).sort({createdAt: -1});
            res.render('home', {
                title: 'Home',
                user: req.user,
                posts,
            });
    }

    // [POST] /post/author/:id
    post(req, res, next) {
        const form = new multiparty.Form();
        
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).send({error: err.message});

            var image, video;
            files.image.forEach(file => {
                if (!file.originalFilename) {
                    image = null;
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

    // [GET] /logout
    logout(req, res) {
        req.logout();
        res.redirect('/auth/login');
    }
}

module.exports = new HomeController();