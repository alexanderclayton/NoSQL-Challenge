const { Schema, Types } = require('mongoose');
const validator = requrire('validator');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [ validator.isEmail, 'Must be a valid email' ], //not sure if this works yet
        },
        thoughts: {
            //not sure what this is yet...
        },
        friends: {
            //not sure what this is yet...
        }

    }
    //add the friendCount virtual here
);

module.exports = userSchema;