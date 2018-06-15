// @flow

require('dotenv').config();

const env: { [key: string]: ?string } = { ...process.env };

const config: { [key: string]: string } = {
  ...env,

  // Application
  APP_HOST: env.APP_HOST || '0.0.0.0',
  APP_PORT: env.APP_PORT || '0',
  APP_SECRET: env.APP_SECRET || 'SUPERSECRETKEY',

  // Database
  DB_HOST: env.DB_HOST || 'mongodb://localhost:27107',
  DB_NAME: env.DB_NAME || 'local',
  DB_USER: env.DB_USER || '',
  DB_PASS: env.DB_PASS || '',

  // Cors
  CORS_ORIGIN: env.CORS_ORIGIN || '',
};

export default config;
