// @flow

const illegalRegExpRe = /([.*+?^=!:${}()|[\]/\\])/g;

export default function escapeRegex(regex: string): string {
  return regex.replace(illegalRegExpRe, '\\$1');
}
