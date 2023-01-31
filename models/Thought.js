const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
            //make this the user that created the thought
        },
        reactions: {
            //Array of nested documents created with the reactionSchema
        },
    },
    //virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
);

module.exports = thoughtSchema;