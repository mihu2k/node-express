const Notification = require('../models/Notification.model');
const multiparty = require('multiparty');
const fs = require('fs');

class NotificationController {
    // [GET] /notification
    show(req, res, next) {
        res.render('notifications/showNotify', {
            title: 'Notifications',
            user: req.user,
        });
    }

    // [GET] /notification/display
    async displayList(req, res, next) {
        const { filterDepartment } = req.query;
        let notification;
        if (!filterDepartment) {
            notification = await Notification.find().populate({path: 'authorId', select: 'name'}).sort({ createdAt: -1 })
        } else {
            notification = await Notification.find({ ofDepartment: filterDepartment })
                                             .populate({path: 'authorId', select: 'name'}).sort({ createdAt: -1 })
        }
        return res.json(notification);
    }

    // [GET] /notification/post
    showFormPost(req, res, next) {
        res.render('notifications/postNotify', {
            title: 'Notifications | Post',
            user: req.user,
        });
    }

    // [POST] /notification/post
    handleFormPost(req, res, next) {
        const form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).send({ error: err.message });

            let fileUpload = [];
            files.files.forEach(file => {
                if (file.originalFilename) {
                    fs.rename(file.path, './public/uploads/notifications/' + file.originalFilename, err => {
                        if (err) console.log(err);
                    });
                    fileUpload.push('/uploads/notifications/' + file.originalFilename);
                }
            });

            const formData = {
                authorId: req.user._id,
                title: fields.title[0],
                content: fields.content[0],
                files: fileUpload,
                ofDepartment: fields.ofDepartment[0],
            }

            await Notification.create(formData);
        })
        res.redirect('/notification');
    }

    // [GET] /notification/detail/:id
    async detailNotification(req, res, next) {
        const notificationId = req.params.id;
        const notification = await Notification.findById(notificationId)
                                               .populate({ path: 'authorId', select: 'name' });

        res.render('notifications/detail', {
            title: 'Notification | Detail',
            user: req.user,
            notification,
        });
    }
}

module.exports = new NotificationController();