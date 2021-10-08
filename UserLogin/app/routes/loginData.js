const UserData = require('../controller/loginData');


module.exports = (app) => {
    app.post('/register', UserData.userRegistrationDetails);

    app.post('/login', UserData.loginUser);
}