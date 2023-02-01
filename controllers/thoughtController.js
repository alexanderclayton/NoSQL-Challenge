const { User, Thought } = require('../models');

module.exports = {
    //thought routes
    getThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .then((thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.param.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json({
                    thought
                })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });        
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                )
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true } //not sure what this does...
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
        )
        .then(() => res.json({ message: 'Thought deleted'}))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID'})
                : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
};