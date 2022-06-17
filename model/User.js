import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Plz fill inputEmail'],
        validate: {
            validator: validator.isEmail,
            message: 'Plz enter a valid email!!',
        },
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Plz fill input name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'Last Name',
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'your city',
    },
    password: {
        type: String,
        required: [true, 'Plz fill input password'],
        minlength: 5,
        trim: true,
        select: true,
    },
});

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// JWT
UserSchema.methods.createJWT = function () {
    const token = jwt.sign({ userId: this._id }, 'jwtsecrete', {
        expiresIn: '1d',
    });
    return token;
};

// compare password
UserSchema.methods.comparePass = async function (candidatePass) {
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
};
export default mongoose.model('User', UserSchema);
