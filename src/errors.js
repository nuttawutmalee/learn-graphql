// @flow

import PrettyError from 'pretty-error';

const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('express');

export const report = (err: any) => {
  // eslint-disable-next-line no-console
  console.log(pe.render(err));
};

export class UnauthorizedError extends Error {
  code = 401;
  statusCode: 401;
  message = this.message || 'Anonymous access is denied.';
}

export class ForbiddenError extends Error {
  code = 403;
  statusCode: 403;
  message = this.message || 'Access is denied.';
}

export default Error;
