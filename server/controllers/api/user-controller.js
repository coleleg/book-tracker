const { User } = require('../../models/');

const { signToken } = require('../../utils/auth');

const userController = {
    async getUserById({ user }, res) {
        const singleUser = await User.findOne({ _id: user._id });

        if (!singleUser) {
            return res.status(400).json({ message: 'No user found!' })
        }

        res.json(singleUser);

    },

    async createUser({ body }, res) {
        const user = new User(body);

        try {
            await user.save();
            res.send(user);
        } catch (error) {
            res.status(500).send(error);
        }

        const token = signToken(user);
        res.json({ token, user });
    },

    async login({ body }, res) {
        const user = await User.findOne({ email: body.email  });

        if (!user) {
            return res.status(400).json({ message: 'No user found with these credentials!'});
        }

        const correctPassword = await user.isCorrectPassword(body.password);

        if (!correctPassword) {
            return res.status(400).json({ message: 'Incorrect password!' })
        }

        const token = signToken(user);
        res.json({ token, user });
    },

    async saveBookToRead({ user, body }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id},
            { $addToSet: { booksToRead: body }},
            { new: true, runValidators: true }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        return res.json(updatedUser);
    },

    async deleteSavedBookToRead({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { booksToRead: { bookId: params.bookId } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        return res.json(updatedUser);
    },

    async addToCurrentlyReading({ user, body}, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { currentlyReading: body }},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        return res.json(updatedUser);
    },

    async deleteBookCurrentlyReading({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { curentlyReading: { bookId: params.bookId } } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        return res.json(updatedUser);
    },

    async addToBooksRead({ user, body}, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $addToSet: { booksRead: body }},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!'})
        }
        return res.json(updatedUser);
    }
}

module.exports = userController;
