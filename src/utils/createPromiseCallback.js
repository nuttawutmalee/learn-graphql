// @flow

import Promise from 'bluebird';

export default function createPromiseCallback(): (
  err: any,
  data: any,
) => void & { promise: Promise<any> } {
  let cb: Object = {};

  const promise = new Promise((resolve, reject) => {
    cb = (err?: any, data?: any) => {
      if (err) return reject(err);
      return resolve(data);
    };
  });

  cb.promise = promise;
  return cb;
}
