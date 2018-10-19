const env = 'production';

export default {
  development: {
    SERVER_URL: 'http://localhost:3001',
    DEV: true
  },
  production: {
    SERVER_URL: 'http://34.220.166.161',
    PROD: true
  }
}[env];