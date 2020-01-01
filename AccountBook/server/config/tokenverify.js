let jwt = require('jsonwebtoken');

exports.checkToken = function (req) {
    var res;
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
        if (token) {
            jwt.verify(token, 'JWT-security-key-Mohe', (err, decoded) => {
                if (err) {
                    res = false;
                }
                else {
                    res = true;
                }
            });
        }
        else {
            res = false;
        }
    }
    return res;
};
