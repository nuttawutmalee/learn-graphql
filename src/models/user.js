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
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email address not valid.',
      ],
    },
    password: {
      type: String,
      required: true,
    },
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
