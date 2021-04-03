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

            const notification = await Notification.create(formData);
            const {_id} = notification;
            const newNotification = await Notification.findById(_id)
                                                      .populate({path: 'authorId', select: 'name'});

            // Handle socket.io
            global.io.sockets.emit('post', {
                notification: newNotification,
            });
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

    // [GET] /notification/me
    async showYourNotification(req, res, next) {
        let notification;
        if (req.user.userType === 'admin') {
            notification = await Notification.find({})
                                             .populate({ path: 'authorId', select: 'name' })
                                             .sort({ createdAt: -1 })
        } else {
            notification = await Notification.find({ authorId: req.user._id })
                                             .populate({ path: 'authorId', select: 'name' })
                                             .sort({ createdAt: -1 })
        }

        res.render('notifications/me', {
            title: 'Your notification',
            user: req.user,
            yourNotification: notification,
        })
    }

    // [DELETE] /notification/me/delete/:id
    async deleteNotification(req, res) {
        const {id} = req.params;

        if (id) {
            await Notification.deleteOne({ _id: id });
        }

        return res.json({ code: 200, message: 'Delete successfully' });
    }

    // [GET] /notification/me/edit/:id
    displayForm(req, res) {
        res.render('notifications/edit', {
            title: 'Edit notification',
            user: req.user,
        })
    }

    // [GET] /notification/me/edit/ajax/:id
    async getDataAjax(req, res) {
        const {id} = req.params;
        var notification;

        if (id) {
            notification = await Notification.findById(id);
        }

        return res.json(notification);
    }

    // [POST] /notification/me/edit/:id
    editNotification(req, res) {
        const form = new multiparty.Form();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).send({ error: err.message });

            var formData = {};
            if (!('radioEdit' in fields)) {
                let fileUpload = [];
                files.filesEdit.forEach(file => {
                    if (file.originalFilename) {
                        fs.rename(file.path, './public/uploads/notifications/' + file.originalFilename, err => {
                            if (err) console.log(err);
                        });
                        fileUpload.push('/uploads/notifications/' + file.originalFilename);
                    }
                });
                formData = {
                    authorId: req.user._id,
                    title: fields.titleEdit[0],
                    content: fields.contentEdit[0],
                    files: fileUpload,
                    ofDepartment: fields.ofDepartmentEdit[0],
                }
            } else {
                if (!('filesEdit' in files)) {
                    if (fields.radioEdit[0] === 'unchange') {
                        formData = {
                            authorId: req.user._id,
                            title: fields.titleEdit[0],
                            content: fields.contentEdit[0],
                            ofDepartment: fields.ofDepartmentEdit[0],
                        }
                    } else if (fields.radioEdit[0] === 'deleteAll') {
                        formData = {
                            authorId: req.user._id,
                            title: fields.titleEdit[0],
                            content: fields.contentEdit[0],
                            files: [],
                            ofDepartment: fields.ofDepartmentEdit[0],
                        }
                    }
                } else {
                    let fileUploadHasRadio = [];
                    files.filesEdit.forEach(file => {
                        if (file.originalFilename) {
                            fs.rename(file.path, './public/uploads/notifications/' + file.originalFilename, err => {
                                if (err) console.log(err);
                            });
                            fileUploadHasRadio.push('/uploads/notifications/' + file.originalFilename);
                        }
                    });
                    formData = {
                        authorId: req.user._id,
                        title: fields.titleEdit[0],
                        content: fields.contentEdit[0],
                        files: fileUploadHasRadio,
                        ofDepartment: fields.ofDepartmentEdit[0],
                    }
                }
            }
            await Notification.updateOne({ _id: req.params.id }, formData);
        })
        res.redirect('/notification/me');
    }
}

module.exports = new NotificationController();