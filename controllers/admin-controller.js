const UsersModel = require('../models/admin-user-model');
const _ = require('lodash');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

function createToken(body) {
    return jwt.sign(body, config.jwt.secretOrKey, {
        expiresIn: config.expiresIn,
    });
}

class AdminCtrl {
    static async  adminLogin(req, res) {
        try {
            console.log('req.body', req.body);
            const user = await UsersModel.findOne({
                username: req.body.username,
            })
                .lean()
                .exec();

            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const token = createToken({ id: user._id, username: user.username });
                res.cookie('token', token, {
                    httpOnly: true,
                });

                res
                    .status(200)
                    .redirect('/home');
            } else {
                console.log('else');
                res
                    .status(400)
                    .send({ message: 'User not exist or password not correct' });
            }
        } catch (err) {
            console.error('E, login,', err);
            res
                .status(500)
                .send({ message: 'some error' });
        }
    }

     static async adminCreate(req, res) {
        try {
            let user = await UsersModel.findOne({
                username: { $regex: _.escapeRegExp(req.body.username), $options: 'i' },
            })
                .lean()
                .exec();
            if (user) {
                return res.status(400).send({ message: 'User already exist' });
            }

            user = await UsersModel.create({
                username: req.body.username,
                password: req.body.password,
            });

            const token = createToken({ id: user._id, username: user.username });

            res.cookie('token', token, {
                httpOnly: true,
            });

            res.status(200).send({ message: 'User created.' });
        } catch (err) {
            console.error('E, register,', err);
            res.status(500).send({ message: 'some error' });
        }
    }

    static async getLogin(req, res) {
        await  res.sendFile(path.resolve('client/views/admin-login.html'));
    }

    static async getHome(req, res) {
        await res.sendFile(path.resolve('client/views/home.html'));
    }
};

module.exports = {
    AdminCtrl ,
};