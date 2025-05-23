const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res, next) => {
  try {
    const { title, author, genre, description } = req.body;
    if (!title || !author) throw new Error('Title and author are required');
    const book = await Book.create({ title, author, genre, description });
    res.status(201).json(book);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reviewPage = 1, reviewLimit = 5 } = req.query;
    const book = await Book.findById(id);
    if (!book) throw new Error('Book not found');

    // Get reviews and average rating
    const reviews = await Review.find({ book: id })
      .populate('user', 'username')
      .skip((reviewPage - 1) * reviewLimit)
      .limit(Number(reviewLimit));

    const avg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const averageRating = avg.length ? avg[0].avgRating : null;

    res.json({ book, averageRating, reviews });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);
    const regex = new RegExp(q, 'i');
    const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
    res.json(books);
  } catch (err) {
    next(err);
  }
};
