// @flow

import pathModule from 'path';

const urlEncodedRe = /%20|\+/g;
const illegalRe = /[?[\]/\\=<>:;,'"&$#*()|`!{}%+^@]/g;
const illegalPathRe = /[?[\]=<>:;,'"&$#*()|`!{}%+^@]/g;
// eslint-disable-next-line
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const dotDotPathsRe = /(^|[\\/])\.\.([\\/]|$)/;
const spaceRe = /\s+/g;

export default function isPathValid(path: string): boolean {
  if (!path) return false;

  const ext = pathModule.extname(path);
  const dir = pathModule.dirname(path);
  const base = pathModule.basename(path, ext);
  const hasDirname = dir !== '.' && dir !== '..' && dir;

  // Is basename valid?
  let isValid = !(
    urlEncodedRe.test(base) ||
    illegalRe.test(base) ||
    controlRe.test(base) ||
    reservedRe.test(base) ||
    spaceRe.test(base)
  );

  if (hasDirname) {
    // Is dirname valid?
    isValid = !(
      illegalPathRe.test(path) ||
      controlRe.test(path) ||
      reservedRe.test(path) ||
      spaceRe.test(path) ||
      dotDotPathsRe.test(path)
    );
  }

  return isValid;
}
