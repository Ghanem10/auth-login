import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: [true, 'Email is requrired.'],
        minlength: 4,
        maxlength: 40,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid Email'
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 3
    }
});

UserSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

/* create a jwt token and pass it to next middleware */
UserSchema.methods.createJWT = function () {
    return jwt
    .sign({ 
        user: { 
            id: this._id,
            user: this.name
        }}, 
            process.env.JWT_SECRET
        ,{ 
            expiresIn: process.env.JWT_LIFETIME
        });
}

// compare the requested password with original password.
UserSchema.methods.comparePassword = async function (candatespassword) {
    const isMatch = await bcryptjs.compare(candatespassword, this.password);
    return isMatch;
}

const SchemaUser = mongoose.model('User', UserSchema);

export default SchemaUser;