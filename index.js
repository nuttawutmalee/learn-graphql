require('babel-polyfill');

/* eslint-disable */Vd
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/server');
} else {
  require('babel-register');
  module.exports =require('./src/server');
}
