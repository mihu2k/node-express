const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin_dev:minhhung@cluster0.dc5yg.mongodb.net/app_notify_dev?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
    }
}

module.exports = { connect };