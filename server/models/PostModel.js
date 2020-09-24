const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A post must have a name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A post must have a description'],
      minlength: 5,
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

userSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, replacement: '' });
  console.log('slugify ran'.yellow);
  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate('user', ' name profileImage username ').populate('comments');
  next();
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
