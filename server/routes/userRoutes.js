const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.get('/me', protect, userController.getMe);
router.post('/follow/:followId', protect, userController.followUser);
router.post('/unfollow/:unfollowId', protect, userController.unfollowUser);

module.exports = router;
