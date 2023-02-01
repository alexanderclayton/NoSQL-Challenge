const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
            //getter method to format the timestamp on query (Luxor?)
        },
        username: {
            type: String,
            required: true,
            //make this the user that created the thought
        },
        reactions: [ reactionSchema ],
            //Array of nested documents created with the reactionSchema,
    },
    //virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;