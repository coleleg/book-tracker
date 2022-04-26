const router = require('express').Router();

const {
    getUserById,
    createUser
} = require('../../controllers/api/user-controller')

router.route('/').post(createUser);

router.route('/users/:id').get(getUserById);


module.exports = router;