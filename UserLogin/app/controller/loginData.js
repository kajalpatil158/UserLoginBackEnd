const userService = require('../service/loginData');
const validator = require('../middleware/userData');

class UserInfo {
   
    userRegistrationDetails = (req, res) => {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password,
          };
         
            var validationUser = validator.joiUserValidator.validate(req.body);
            if (validationUser.error) {
                logger.error(validationUser.error.details[0].message);
                return res.status(400).send({
                  success: false,
                  message: validationUser.error.details[0].message,
                });
              }
            userService.create(userData, (error, validationUser) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: "Eroor Occured While Login",
                    })
                }
                res.status(200).send({
                    success: true,
                    message: "User Data Is Added",
                    data: validationUser
                })
            })
        }
       
    loginUser = (req, res) => {
        let userInfo = validator.joiUserValidator.validate(req.body);
        userService.getUserByEmail(userInfo.value)
        .then((data) => {
            res.send({
                success: true,
                message: "User Login Successfull!!",
                token: data
            });
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: "error"
            });
        });
    }
}

module.exports = new UserInfo();