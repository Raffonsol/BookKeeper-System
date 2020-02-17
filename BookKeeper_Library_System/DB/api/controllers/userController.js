var User = require('../models/userModel.js');

exports.list_all_users = function(req, res) {
    User.getAllUsers(function(err, user) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.count_users = function(req, res) {
    User.countAllUsers(function(err, user) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};

exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
    User.createUser(new_user, function(err, task) {

        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_user = function(req, res) {
    User.getUserById(req.params.userId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_user = function(req, res) {
    User.updateById(req.params.userId, new User(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_user = function(req, res) {


    User.remove( req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};