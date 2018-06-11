import mongoose from 'mongoose';

/**
 * Schema
 */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email address not valid.',
      ],
    },
    password: {
      type: String,
      required: true,
      match: [
        /^((?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}<>[\]])(?=.*[0-9])(?=.*[a-z]).{8,})$/,
        'Password must have at least 8 characters, and consists of lowercase characters (a-z), uppercase characters(A-Z), special characters and numbers.',
      ],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: { data: Buffer, contentType: String },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED'],
      uppercase: true,
      default: 'PENDING',
    },
    verficationToken: String,
  },
  {
    collection: 'Users',
    timestamps: true,
  },
);

/**
 * - Hooks
 * - Validations
 * - Virtuals
 */

/**
 * Methods
 */

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user by id.
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) return user;
        const err = new Error('User not found');
        return Promise.reject(err);
      });
  },
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
