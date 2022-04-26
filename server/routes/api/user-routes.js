const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
    getUserById,
    createUser,
    login,
    saveBookToRead,
    deleteSavedBookToRead,
    addToCurrentlyReading,
    deleteBookCurrentlyReading,
    addToBooksRead
} = require('../../controllers/api/user-controller')

router.route('/')
    .post(createUser)
    
router.route('/booksToRead')
    .put(authMiddleware, saveBookToRead)

router.route('/booksToRead/:bookId')
    .delete(authMiddleware, deleteSavedBookToRead)

router.route('/currentlyReading')
    .put(authMiddleware, addToCurrentlyReading)
    
router.route('/currentlyReading/:bookId')
    .delete(authMiddleware, deleteBookCurrentlyReading)

router.route('/booksRead')
    .put(authMiddleware, addToBooksRead)

router.route('/me')
    .get(authMiddleware, getUserById);

router.route('/login')
    .post(login);

module.exports = router;