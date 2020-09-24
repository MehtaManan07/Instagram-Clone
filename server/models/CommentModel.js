const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Comment cannot be empty'],
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Comment must belong to a user']
  },
  post: {
    type: ObjectId,
    ref: 'Post',
    required: [true, 'Comment must belong to a post']
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.pre(/^find/, function (next) {
    this.populate('user', 'name username profileImage');
    next();
  });
  
const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment
