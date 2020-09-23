const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A post must have a name'],
    unique: true,
    trim: true,
    maxlength: [39, 'A tour name must have less than 40 characters'],
    minlength: [10, 'A tour name must have more than 10 characters'],
    // validate: [validator.isAlpha, "Tour name must only contain characters"],
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

const Post = mongoose.model('Post',postSchema)
module.exports = Post