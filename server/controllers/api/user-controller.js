const { User } = require('../../models/');

const userController = {
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .select('-__v')
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
}

module.exports = userController;
