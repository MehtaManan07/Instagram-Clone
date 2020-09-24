const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

router.use(protect)
router.get('/me', userController.getMe);
router.post('/follow/:followId', userController.followUser);
router.post('/unfollow/:unfollowId', userController.unfollowUser);
router.put('/',userController.updateUser)
router.get('/:id', userController.getProfile)
router.post('/search/:query',userController.search)
router.delete('/',userController.deactivate)

module.exports = router;