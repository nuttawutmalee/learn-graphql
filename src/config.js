// @flow

require('dotenv').config();

const config: { [key: string]: string | void } = { ...process.env };

export default {
  ...config,

  // Application
  APP_HOST: config.APP_HOST || '0.0.0.0',
  APP_PORT: Number(config.APP_PORT) || 0,
  APP_SECRET: config.APP_SECRET || 'SUPERSECRETKEY',

  // Database
  DB_HOST: config.DB_HOST || 'mongodb://localhost:27107',
  DB_NAME: config.DB_NAME || 'local',
  DB_USER: config.DB_USER || '',
  DB_PASS: config.DB_PASS || '',

  CORS_ORIGIN: config.CORS_ORIGIN || '',
};
