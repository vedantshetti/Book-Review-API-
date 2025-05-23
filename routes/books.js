const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addBook, getBooks, getBookById, searchBooks } = require('../controllers/bookController');
const { addReview } = require('../controllers/reviewController');

// Books
router.post('/books', auth, addBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);

// Reviews for a book
router.post('/books/:id/reviews', auth, addReview);

// Search
router.get('/search', searchBooks);

module.exports = router;
