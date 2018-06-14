/* @flow */
/* eslint-disable func-names */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Schema
 */
export const UserSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED'],
      uppercase: true,
      default: 'PENDING',
    },
    verificationToken: String,
  },
  {
    collection: 'user',
    timestamps: true,
    collation: {
      locale: 'simple',
    },
  },
);

/**
 * Document
 */
export class UserDoc extends mongoose.Model {
  username: string;
  email: string;
  password: string;
  name: string;
  status: string;
  verificationToken: ?string;

  /**
   * Virtuals
   */

  /**
   * Statics
   */

  /**
   * Get user by id.
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User>}
   */
  static get(id: MongoId): Promise<UserDoc> {
    return this.findById(id)
      .exec()
      .then(user => {
        if (user) return user;
        const err = new Error('User not found');
        return Promise.reject(err);
      });
  }

  /**
   * Methods
   */

  /**
   * Compare password with the encrypted password.
   * @param {String} password
   * @returns {Boolean} true if matched, otherwise false
   */
  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

/**
 * Hooks & Validations
 */

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password);
  return next();
});

UserSchema.loadClass(UserDoc);

/**
 * @typedef User
 */
const User: typeof UserDoc = mongoose.model('User', UserSchema);

export default User;
