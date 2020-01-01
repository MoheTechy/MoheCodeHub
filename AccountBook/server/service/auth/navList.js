'use strict';

var Sequelize = require('../../config/sequelize').getConnection();

exports.userNavList = function(req, res) {
      console.log(req.body); 
      var replacements = { loginId: req.params.loginId };
      let sql = "SELECT DISTINCT ml.id, ml.parentId, ml.displayName, ml.iconName, ml.route, ml.module, ml.permissionName, ml.isActive, rp.isRead, rp.isWrite FROM users u JOIN userRoles ur ON ur.userId = u.id JOIN roles r ON r.id = ur.roleId JOIN rolesPermission rp ON rp.roleId = r.id RIGHT JOIN permission p ON p.id = rp.permissionId JOIN menuList ml ON ml.permissionName = p.name WHERE(rp.isRead = 1 OR rp.isWrite = 1) AND rp.isActive = 1 AND LOWER(u.loginId) = :loginId AND ml.isActive = 1 AND ur.isActive = 1;";

      Sequelize.query(sql, { replacements: replacements, type: Sequelize.QueryTypes.SELECT })
      .then(recrds => {
            var parentNav = recursive(recrds, null);
            console.log(parentNav);
            res.status(200);
            res.send({statusBool: true, permission: parentNav});
      });                        
}

function recursive(navList, id) {
      var naviList = navList;
      var parentNav = naviList.filter(nav => nav.parentId == id);
      for (var i = 0; i < parentNav.length; i++) {
          parentNav[i].children = recursive(naviList, parentNav[i].id)
      }
      return parentNav;
  }