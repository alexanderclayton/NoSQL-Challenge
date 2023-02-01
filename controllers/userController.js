const { User, Thought } = require('../models');

module.exports = {
    //user routes
    getUsers(req, res) {
        User.find()
        .select('__v')
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.param.userId })
        .select('__v')
        .populate('friends')
        .populate('thoughts')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json({
                    user
                    //include thought and friend data
                })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });        
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true } //not sure what this does...
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User deleted'}))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
}
