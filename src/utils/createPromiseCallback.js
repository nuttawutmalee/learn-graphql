// @flow

import Promise from 'bluebird';

type AsyncCallback = (err: any, result: any) => void;

type AsyncPromiseCallback = AsyncCallback & { promise: Promise<any> };

export default function createPromiseCallback(): AsyncPromiseCallback {
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
