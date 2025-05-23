const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { updateReview, deleteReview } = require('../controllers/reviewController');

router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
