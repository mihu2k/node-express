const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');
const fs = require('fs');
const multiparty = require('multiparty');

class ProfileController {
    // [GET] /profile/:id
    show(req, res, next) {
        User.findById(req.params.id)
            .then(infoProfile => {
                res.render('profile', {
                    title: infoProfile.name + ' | Profile',
                    user: req.user,
                    userLogin: JSON.stringify(req.user),
                    infoProfile,
                    infoProfileWorkFlow: JSON.stringify(infoProfile),
                });
            })
    }

    // [GET] /profile/:id/post?page=x
    async showPost(req, res, next) {
        const page = req.query.page;
        const posts = await Post.find({ authorId: req.params.id }, null, { populate: [{path: 'authorId', select: 'avatar name'}, {path: 'comments', populate: {path: 'userCommentId', select: 'avatar name'}}] })
                                .sort({createdAt: -1})
                                .limit(10).skip((page - 1) * 10);
        return res.json(posts);
    }

    // [PUT] /profile/:id/edit
    edit(req, res, next) {
        const form = new multiparty.Form();

	    form.parse(req, async (err, fields, files) => {
		    if (err) return res.status(500).send({ error: err.message });

            var avatar;
            files.editAvtProf.forEach(file => {
                if (!file.originalFilename) {
                    avatar = '';
                } else {
                    fs.rename(file.path, './public/uploads/' + file.originalFilename, err => {
                        if (err) console.log(err)
                    })
                    avatar = '/uploads/' + file.originalFilename;
                }
            })

            var formData = {
                name: fields.editNameProf[0],
                group: fields.editGroupProf[0],
                faculty: fields.editFacultyProf[0],
                avatar: avatar,
            }

            if (!avatar) {
                delete formData.avatar;
            }
    
            await User.updateOne({ _id: req.params.id }, formData);
            User.findById(req.params.id)
                .then((newUser) => res.json({ code: 200, message: 'User is updated successfully!', data: newUser }))
                .catch(next)
        })
    }
}

module.exports = new ProfileController();