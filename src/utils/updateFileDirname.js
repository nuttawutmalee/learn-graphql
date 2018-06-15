// @flow

import pathModule from 'path';

export default function updatePathFilename(
  path: string,
  dirname: string,
  forcePrepend: boolean = false,
): string {
  if (!dirname) return path;

  const dir = pathModule.dirname(path);
  const base = pathModule.basename(path);
  const newExt = pathModule.extname(dirname);
  const newDir = newExt ? pathModule.dirname(dirname) : dirname;

  if (forcePrepend) return pathModule.join(newDir, base);

  const oldPaths = dir.split(pathModule.sep) || [];
  const newPaths = newDir.split(pathModule.sep) || [];
  const diffPaths =
    oldPaths.length >= newPaths.length
      ? oldPaths.slice(newPaths.length)
      : newPaths.slice(oldPaths.length);
  const diff = pathModule.join(...diffPaths) || '';

  return pathModule.join(newDir, diff, base);
}
