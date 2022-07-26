
const { Schema, model } = require('mongoose');
const bcrtypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: { type: String },
        password: { type: String },
    },
    {
        collection: 'Users',
    },
);

UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew()) {
        this.password = bcrtypt.hashSync(this.password, 12);
    }
    next();
});

module.exports = model('UserModel', UserSchema);
