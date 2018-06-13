// @flow

require('dotenv').config();

const config: { [key: string]: string | void } = { ...process.env };

export default config;
