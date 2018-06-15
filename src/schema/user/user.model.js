/* @flow */
/* eslint-disable func-names */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

import Avatar, { AvatarDoc, AvatarSchema } from '../avatar/avatar.model';
import { getUniqueFilename, sanitizeFilename } from '../../utils';

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

    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: AvatarSchema,
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

// START TODO: Make it more generic and reusable
const avatarDir = '/storage/avatars';
const uploadDir = path.join(process.cwd(), 'resources', avatarDir);

mkdirp.sync(uploadDir);

const storeFS = ({ stream, filename }) => {
  const sanitized = sanitizeFilename(filename);
  const saveName = getUniqueFilename(sanitized);
  const savePath = path.join(uploadDir, saveName);
  const avatarPath = path.join(avatarDir, saveName);

  return new Promise((resolve, reject) =>
    stream
      .on('error', err => {
        if (stream.truncated) {
          fs.unlinkSync(savePath);
        }
        reject(err);
      })
      .pipe(fs.createWriteStream(savePath))
      .on('error', err => reject(err))
      .on('finish', () => resolve(avatarPath)),
  );
};

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;
  const savePath = await storeFS({ stream, filename });
  return { filename, mimetype, encoding, path: savePath };
};
// END TODO

/**
 * Document
 */
export class UserDoc extends mongoose.Model {
  username: string;
  email: string;
  password: string;
  displayName: string;
  avatar: ?AvatarDoc;
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
   * @param {ObjectId} id The objectId of user
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
   * Register user and create a new object.
   * @param {Object} data User object data
   * @returns {Promise<User>}
   */
  static async signup(data: any): Promise<UserDoc> {
    const { avatar, ...userData } = data;

    if (!avatar) {
      return this.create(userData);
    }

    try {
      const avatarData = await processUpload(avatar);
      return this.create({ ...userData, avatar: new Avatar(avatarData) });
    } catch (err) {
      return Promise.reject(err);
    }
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
