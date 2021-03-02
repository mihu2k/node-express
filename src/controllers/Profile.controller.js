const User = require('../models/User.model');
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
                    infoProfile,
                    infoProfileWorkFlow: JSON.stringify(infoProfile),
                });
            })
    }

    // [PUT] /profile/:id/edit
    edit(req, res, next) {
        const form = new multiparty.Form();

	    form.parse(req, (err, fields, files) => {
		    if (err) return res.status(500).send({ error: err.message });

            var avatar;
            files.editAvtProf.forEach(file => {
                if (!file.originalFilename) {
                    avatar = req.user.avatar;
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
    
            User.updateOne({ _id: req.params.id }, formData)
                .then(() => res.json({ code: 200, message: 'Update successfully!', data: formData }))
                .catch(next)
        })
    }
}

module.exports = new ProfileController();