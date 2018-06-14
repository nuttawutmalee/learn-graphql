// @flow

export default function assignType(type: string) {
  return (obj: ?Object) => {
    if (obj) obj.__type = type;
    return obj;
  };
}
