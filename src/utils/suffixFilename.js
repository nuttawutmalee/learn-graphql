// @flow

import pathModule from 'path';

export default function suffixFilename(
  path: string,
  suffix: string,
  separator: string = '-',
): string {
  if (!suffix) return path;

  const dir = pathModule.dirname(path);
  const ext = pathModule.extname(path);
  const base = pathModule.basename(path, ext);
  const hasDirname = dir !== '.' && dir !== '..' && dir;
  const suffixed = `${base}${separator}${suffix}${ext}`;

  if (hasDirname) return pathModule.join(dir, suffixed);

  return suffixed;
}
