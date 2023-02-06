'use strict';

const fs = require('fs');
const paths = require('./paths');

delete require.cache[require.resolve('./paths')];

// .env の読み込み
const defaultDotenvFile = paths.dotenv;
const stageDotenvFile = `${paths.dotenv}${process.env.DOT_ENV !== 'local' ? `.${process.env.DOT_ENV}` : ''}`;
const dotenvFile = fs.existsSync(stageDotenvFile) ? stageDotenvFile :
  fs.existsSync(defaultDotenvFile) ? defaultDotenvFile : null;
  
if (dotenvFile) {
  const dotenv = require('dotenv');
  const dotenvExpand = require('dotenv-expand');
  const env = dotenv.config({ path: dotenvFile });
  dotenvExpand.expand(env)
}

// .env から json で環境変数を生成する
// 環境変数は process.env に格納される
const getClientEnvironment = () => {
  let DOT_ENV = process.env.DOT_ENV;
  let NODE_ENV = process.env.NODE_ENV;
  let PUBLIC_PATH = process.env.PUBLIC_PATH;
  let MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  let S3_DOMAIN = process.env.S3_DOMAIN;
  const row = {
    DOT_ENV,
    NODE_ENV,
    PUBLIC_PATH,
    MAPBOX_ACCESS_TOKEN,
    S3_DOMAIN,
  }
  const envStringified = Object.keys(row).reduce((env, key) => {
    env[key] = JSON.stringify(row[key]);
    return env;
  }, {});
  return { row, envStringified };
}

module.exports = getClientEnvironment;
