// @flow

import pathModule from 'path';

const urlEncodedRe = /%20|\+/g;
const illegalRe = /[?[\]/\\=<>:;,'"&$#*()|`!{}%+^@]/g;
// eslint-disable-next-line
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[. ]+$/;
const spaceRe = /\s+/g;

export default function sanitizeFilename(
  path: string,
  replacement: string = '',
): string {
  const ext = pathModule.extname(path);
  const base = pathModule.basename(path, ext);

  const sanitized = base
    .trim()
    .replace(urlEncodedRe, replacement)
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement)
    .replace(spaceRe, replacement);

  if (replacement === '') return `${sanitized}${ext}`;

  return sanitizeFilename(sanitized, '');
}
