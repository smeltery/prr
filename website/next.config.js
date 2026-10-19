const path = require('node:path');
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  outputFileTracingRoot: path.join(__dirname, '..'),
};
