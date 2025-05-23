const Review = require('../models/Review');

exports.addReview = async (req, res, next) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;
    if (!rating) throw new Error('Rating required');
    // One review per user per book enforced by schema index
    const review = await Review.create({
      user: req.user._id,
      book: bookId,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (err) {
    err.status = 400;
    if (err.code === 11000) err.message = 'You already reviewed this book';
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) throw new Error('Review not found');
    if (!review.user.equals(req.user._id)) throw new Error('Unauthorized');
    const { rating, comment } = req.body;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    await review.save();
    res.json(review);
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) throw new Error('Review not found');
    if (!review.user.equals(req.user._id)) throw new Error('Unauthorized');
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
