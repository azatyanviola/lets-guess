const UserModel = require('../models/user-model');
const _ = require('lodash');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createToken(body) {
    return jwt.sign(body, config.jwt.secretOrKey, {
        expiresIn: config.expiresIn,
    });
}

const numberCheck = /\d/g;
const lowerCaseCheck = /^(?=.*[a-z]).*$/;
const upperCaseCheck = /^(?=.*[A-Z]).*$/;
const specialSymbolCheck = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/;
const languageCheck = /[^a-zA-Zа-яА-Я\u0561-\u0587\u0531-\u0556-]+/g;

class UsersCtrl {
    static async  userLogin(req, res) {
        try {
            const user = await UserModel.findOne({
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
                    .send({ message: 'User successfully logged ' });
            } else {
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

    static async userCreate(req, res) {
        try {
            let user = await UserModel.findOne({
                username: { $regex: _.escapeRegExp(req.body.username), $options: 'i' },
            })
                .lean()
                .exec();
            if (user) {
                return res.status(400).send({ message: 'User already exist' });
            }

            user = await UserModel.create({
                username: req.body.username,
                password: req.body.password,
            });
            if (req.body.password === '') {
                return res.send({ message: 'Password cannot be blank' });
            } if (req.body.password < 8) {
                return res.send({ message: 'Password length must be at least 8 characters' });
            } if (req.body.password > 16) {
                return res.send({ message: 'Password length must not exceed 16 characters' });
            } if (!numberCheck.test(req.body.password)) {
                return res.send({ message: 'Password must have at least one digit' });
            } if (!lowerCaseCheck.test(req.body.password)) {
                return res.send({ message: 'Password must have at least one lower case' });
            } if (!upperCaseCheck.test(req.body.password)) {
                return res.send({ message: 'Password must have at least one upper case' });
            } if (!specialSymbolCheck.test(req.body.password)) {
                return res.send({ message: 'Password must have at least one symbol' });
            } if (!languageCheck.test(req.body.password)) {
                return res.send({ message: 'Password must be Latin, Armenian or Russian' });
            }
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

    static async getOneUser(req, res) {
        const { id } = req.params;

        const question = await UserModel.findOne({ _id: id });

        return res.send(question);
    }

    static async getUsers(req, res) {
        const questions = await UserModel.find();

        return res.send({
            data: questions,
        });
    }
    // static async getLoginPage(req, res) {
    //     await  res.sendFile(path.resolve('client/views/user-login.html'));
    // }

    // static async getHome(req, res) {
    //     await res.sendFile(path.resolve('client/views/home.html'));
    // }

    // static async getRegister(req, res) {
    //     await  res.sendFile(path.resolve('client/views/registration.html'));
    // }
}

module.exports = {
    UsersCtrl,
};
