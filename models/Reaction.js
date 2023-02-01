const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reaction: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
            //user that created the reaction
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
        },
    },
    //This is schema only?  Will not be a model, but instead a subdocument for the thought model.
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;