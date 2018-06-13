// @flow

export default function mapToValue(
  keys: $ReadOnlyArray<string | number> | Array<string | number>,
  keyFn: any => string | number,
  valueFn: any => any,
) {
  return (rows: Array<any>) => {
    const map = new Map(keys.map(key => [key, null]));
    rows.forEach(row => map.set(keyFn(row), valueFn(row)));
    return [...map.values()];
  };
}
