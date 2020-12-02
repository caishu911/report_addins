const {createProxyMiddleware} = require('http-proxy-middleware');
// const CONFIG = require('../src/config.json');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', 
        {
            target: 'https://portal.it/',
            secure: false,
            changeOrigin: true
        }
    ));
}