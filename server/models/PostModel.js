const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A post must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A post must have a description'],
    minlength: 5
  },
  slug: String,
  image: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      user: { type: ObjectId, ref: 'User' },
      name: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

postSchema.pre(/^find/, function (next) {
  this.populate('user', ' name photo username ');
  next()
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
