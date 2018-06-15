// @flow

import fs from 'fs';
import pathModule from 'path';
import shortId from 'shortid';

import suffixFilename from './suffixFilename';

const numberSuffixRe = /-(\d+)$/;

export default function getUniqueFilename(path: string): string {
  const dir = pathModule.dirname(path);
  const hasDirname = dir !== '.' && dir !== '..' && dir;

  if (!hasDirname) {
    return suffixFilename(path, shortId.generate());
  }

  const ext = pathModule.extname(path);

  // Add number at the end of basename until it is unique
  while (fs.existsSync(path)) {
    let base = pathModule.basename(path, ext);
    const match = base.match(numberSuffixRe) || [];

    if (match.length > 0) {
      // Increase number suffix
      const currentNumberRe = new RegExp(`${match[0]}$`);
      const nextNumber = Number(match[1]) + 1;

      base = base.replace(currentNumberRe, `-${nextNumber}`);
      path = `${pathModule.join(dir, base)}${ext}`;
    } else {
      // No number suffix yet
      path = suffixFilename(path, '1');
    }
  }

  return pathModule.basename(path);
}
