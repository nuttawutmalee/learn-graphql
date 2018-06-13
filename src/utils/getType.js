// @flow

export default function getType(obj: any) {
  return obj ? obj.__type : undefined;
}
