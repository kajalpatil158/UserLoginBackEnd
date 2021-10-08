const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('../middleware/helper');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[A-Z]{1}[A-Za-z\\s]{1,}$/
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/
    },
    password: {
        type: String,
        required: true,
        validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    }
}, {
    timestamps: true
});
const userModel = mongoose.model('UserSchema', UserSchema);
class userDataModel {

    create = (userData, callBack) => {
            const user = new userModel({
                firstName: userData.firstName,
                lastName: userData.lastName,
                emailId: userData.emailId,
                password: userData.password,
            });
            user.save({}, (error, data) => {
                return (error) ? callBack(error, null) : callBack(null, data);
            });
        }
       
    getUserByEmail = (credentials, callBack) => {
        userModel.findOne({ "emailId": credentials.emailId }, (error, data) => {
            if (error) {
                return callBack(error, null)
            }
            return (!data) ? callBack("User Not Exist ", null) : callBack(null, data);
        })
    }
}
module.exports = new userDataModel();