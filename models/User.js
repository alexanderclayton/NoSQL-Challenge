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
        thoughts: [
            {
            //not sure what this is yet...
                type: Schema.Types.ObjectId ,
                ref: 'Thought',
            },
        ],
        friends: [
            {
            //not sure what this is yet...
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    //add the friendCount virtual here
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

module.exports = userSchema;