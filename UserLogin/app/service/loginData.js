const UserModel = require('../model/loginData');
const logger = require('../../config/logger');
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
require("dotenv").config();

class UserService { 
    create = (userData, callBack) => {
            const salt = genSaltSync(10);
            userData.password = hashSync(userData.password, salt);
            UserModel.create(userData, (error, data) => {
                if(error){
                    logger.error("User Not Created ",error);
                    return callBack(error, null);  
                }
                    logger.info("User Created - ",data);
                    return callBack(null, data);
            });
        }
      
    getUserByEmail = (credentials) => {
        return new Promise((resolve, reject) => {
            UserModel.getUserByEmail(credentials, (error, data) => {
                if (error) {
                    reject(error) 
                    return;
                }
                let result = bcrypt.compareSync(credentials.password, data.password);
                if (result) {
                    const jsontoken = sign({ result: data }, process.env.JWT_KEY, { expiresIn: "1h" });
                    resolve(jsontoken)
                    return;
                }
                return reject("Invalid Email");
            });
        })
    }
}

module.exports = new UserService();