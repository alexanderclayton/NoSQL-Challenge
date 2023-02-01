const { User, Thought, Reaction } = require('../models');
//do we need reaction here?

module.exports = {
    //user routes
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObject = {
                users
            };
            return res.json(userObject);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.param.userId })
        .select('__v')
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
                : User.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User deleted'}))
        .catch((err) => res.status(500).json(err));
    }
}
