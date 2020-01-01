'use strict'
var Sequelize = require('../../config/sequelize').getConnection();
var tokenVerify = require('../../config/tokenverify');

exports.isUserCanEditFailurePOD = function (req, res) {

    var callfn = tokenVerify.checkToken(req);

    if (callfn) {

        let replacements = req.body;
        Sequelize
            .query('EXEC GetUserRoles :LoginId', { replacements: replacements, type: Sequelize.QueryTypes.SELECT })
            .then(queryReturn);
        function queryReturn(recs) {
            console.log('inside service user..');
            console.log(recs);
            let roles = recs;
            let i = 0;
            roles.forEach(element => {
                if (element.roleID == '1' || element.roleID == '3') {
                    let canEdit = { 'canEdit': true };
                    res.send(JSON.stringify(canEdit));
                    return;
                } else {
                    let canEdit = { 'canEdit': false };
                    if (i >= roles.length - 1) {
                        res.send(JSON.stringify(canEdit));
                    }
                }
                i = i + 1;
            });
        }
    }
}