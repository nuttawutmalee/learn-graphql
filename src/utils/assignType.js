// @flow

export default function assignType(type: string) {
  return (obj: any) => {
    if (obj) obj.__type = type;
    return obj;
  };
}
