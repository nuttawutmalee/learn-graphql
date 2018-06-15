/* @flow */

import mongoose from 'mongoose';

/**
 * Schema
 */
export const AvatarSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
      unique: true,
    },

    mimetype: {
      type: String,
      required: true,
    },

    encoding: {
      type: String,
    },
  },
  {
    collection: 'avatar',
    timestamps: false,
  },
);

/**
 * Document
 */
export class AvatarDoc extends mongoose.Model {
  filename: string;
  path: string;
  mimetype: string;
  encoding: ?string;

  /**
   * Virtuals
   */

  /**
   * Statics
   */

  /**
   * Methods
   */
}

/**
 * Hooks & Validations
 */

AvatarSchema.loadClass(AvatarDoc);

/**
 * @typedef Avatar
 */
const Avatar: typeof AvatarDoc = mongoose.model('Avatar', AvatarSchema);

export default Avatar;
