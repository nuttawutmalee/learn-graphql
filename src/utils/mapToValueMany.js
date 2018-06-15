// @flow

export default function mapToValueMany(
  keys: $ReadOnlyArray<string | number> | Array<string | number>,
  keyFn: any => string | number,
  valueFn: any => Array<any>,
) {
  return (rows: Array<any>) => {
    const map = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (map.get(keyFn(row)) || []).push(valueFn(row)));
    return [...map.values()];
  };
}
