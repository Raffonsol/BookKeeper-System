var Role = require('../models/roleModel.js');

exports.list_all_roles = function(req, res) {
    Role.getAllRoles(function(err, role) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', role);
        res.send(role);
    });
};

