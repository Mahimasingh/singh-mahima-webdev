var app = require('../../express');
var userModel = require("../models/user/user.model.server");



app.get("/api/users",getAllUsers);

app.get("/api/user/:userId",getUserById);

app.get("/api/user",findUser);

app.post("/api/user",registerUser);

app.put("/api/user/:userId",updateUser);

app.delete("/api/user/:userId",deleteUser);

function deleteUser(req,res) {

    userId = req.params.userId;

    userModel
        .deleteUserById(userId)

        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

    // for(var u in users){
    //     var _user = users[u];
    //     if(_user._id === userId){
    //         var index = users.indexOf(_user);
    //         if(index > -1){
    //             users.splice(index,1);
    //
    //         }
    //     }
    // }
    // res.send(users);



function getAllUsers(req,response) {
    response.send(users);
}

function getUserById(req,response) {

    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        });
    //
    // for(var u in users){
    //     if(users[u]._id === req.params.userId){
    //         response.send(users[u]);
    //     }
    // }

}

function findUser(req, res) {

    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {

                res.json(user);
            }, function (err) {
                res.status(404).json({message: err.message});
            })
    }
    else if (username) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                res.json(user);

                },
                function (err) {
                    res.status(404).json({message: err.message });
                });
    }
}

function registerUser(req,response) {

    var user = req.body;

    userModel
        .createUser(user)
        .then(
            function (user) {
                response.json(user);
            },
            function (err) {
                response.status(404).json({message: err.message});
            });


}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });


    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         users[u] = user;
    //         res.send(user);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

