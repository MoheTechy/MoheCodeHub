'use strict';

var path = require('path');
module.exports = function(app) {

      app.use('/api/auth', require('../service/auth'));
      app.use('/api/admin/roles', require('../service/admin/roles'));
      app.use('/api/admin/users', require('../service/admin/users'));
      app.use('/api/admin/permission', require('../service/admin/permission'));
      app.use('/api/accounts', require('../service/account'));
      app.use('/api/masters', require('../service/master'));

      app.route('/*')
        .post(function (req, res) {
            res.sendFile(path.join(path.normalize(__dirname + '/../..'), 'www//index.html'));
      })
}