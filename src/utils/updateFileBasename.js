// @flow

import pathModule from 'path';

export default function updatePathBasename(
  path: string,
  filename: string,
  preservedSuffixRegex: ?RegExp = null,
): string {
  if (!filename) return path;

  const dir = pathModule.dirname(path);
  const ext = pathModule.extname(path);
  const base = pathModule.basename(path, ext);
  const hasDirname = dir !== '.' && dir !== '..' && dir;

  let suffix = '';

  if (preservedSuffixRegex && preservedSuffixRegex instanceof RegExp) {
    const match = base.match(preservedSuffixRegex) || [];

    if (match.length > 0) {
      // Store suffix, so we can add to the new basename later
      [suffix] = match;
    }
  }

  const newExt = pathModule.extname(filename);
  const newBase = pathModule.basename(filename, newExt);

  // Add stored suffix
  const updatedBaseAndExt = `${newBase}${suffix}${newExt}`;

  if (hasDirname) return pathModule.join(dir, updatedBaseAndExt);

  return updatedBaseAndExt;
}
