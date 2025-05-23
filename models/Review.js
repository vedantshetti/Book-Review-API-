const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book:    { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  rating:  { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true });

reviewSchema.index({ user: 1, book: 1 }, { unique: true }); // One review per user per book

module.exports = mongoose.model('Review', reviewSchema);
