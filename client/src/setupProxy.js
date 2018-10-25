const proxy = require('http-proxy-middleware')
    
module.exports = function(app) {
  app.use(proxy('/srv/*', { target: 'http://localhost:5000/' }));
}