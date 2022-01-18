const User = require('../models/user.model');
const configs = require('../configs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = (req,res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: false,
    });

    user
    .save()
    .then((user) => {
       let userToken = jwt.sign(
           {
               id: (user._id),
               isAdmin: user.isAdmin
           },
           configs.jwt.secret,
           {
               expiresIn: 86400,
           }
       );

       res.status(200).send({
         auth: true,
         token: userToken,
       });
    })
    .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured",
          email : req.body.email
        });
    });
};

exports.login = (req, res) => {
    User
    .findOne({email : req.body.email})
        .then((user) => {
            if (!bcrypt.compareSync(req.body.password,user.password)) {
                res.status(401).send({
                    message: "Invalid password",
                    auth: false,
                    token: null,
                });
                return false;
            }

            let userToken = jwt.sign (
                {
                    id: (user._id),
                    isAdmin: user.isAdmin
                },
                configs.jwt.secret,
                {
                    expiresIn: 86400,
                }
            );

            res.status(200).send({
                auth: true,
                token: userToken,
            });
        })
        .catch((err) => {
            res.status(404).send({
                auth: false,
                message: "Email not found",
            })
        });
};

exports.getUser = (req, res) => {
    User.findById(req.user.id)
    .then((user) => {
        res.send(user);
    })
    .catch((err) => {
        res.status(404).send(err);
    })
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    })
    .then((data) => {
        res.status(200).send({
            message: "User has been modified"
        });
    })
    .catch((err) => {
        res.status(500).json({
            err: err
        });
    })
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.user.id)
    .then((data) => {
        res.status(200).send({
            message: "User has been deleted"
        })
    })
    .catch((err) => {
        res.status(500).json({
            err: err
        });
    })
}