// @flow

export default function mapTo(
  keys: $ReadOnlyArray<string | number> | Array<string | number>,
  keyFn: any => string | number,
) {
  return (rows: Array<any>) => {
    const map = new Map(keys.map(key => [key, null]));
    rows.forEach(row => map.set(keyFn(row), row));
    return [...map.values()];
  };
}
