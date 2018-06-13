// @flow

export default function mapToMany(
  keys: $ReadOnlyArray<string | number> | Array<string | number>,
  keyFn: any => string | number,
) {
  return (rows: Array<any>) => {
    const map = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (map.get(keyFn(row)) || []).push(row));
    return [...map.values()];
  };
}
