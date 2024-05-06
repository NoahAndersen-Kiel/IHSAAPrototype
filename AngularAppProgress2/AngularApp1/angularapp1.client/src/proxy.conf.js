const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7242';

const PROXY_CONFIG = [
  {
    context: [
      "/api/meets", // Assuming you have an API endpoint like this for gymnastics meets
      "/api/schools", // And another for schools
      "/api/competitors", // And one for gymnasts
      // Add any other API endpoints your frontend needs to access
    ],
    target,
    secure: false
  }
];

module.exports = PROXY_CONFIG;
