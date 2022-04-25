const { User } = require('../../models/User');
const router = require('express').Router();

    router.get('/:id', (req, res) => {
        User.findOne({
            _id: params._id
        }).then(data => {
            if(!data) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(data)
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    })

module.exports = router;
