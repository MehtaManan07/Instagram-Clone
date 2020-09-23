const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
router.get('/me', protect, userController.getMe);

module.exports = router;
