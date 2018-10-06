// https://github.com/johnpapa/lite-server/issues/61

// https://www.npmjs.com/package/http-proxy-middleware
var proxy = require('http-proxy-middleware');

// https://browsersync.io/docs/options/
module.exports = {
    port: 80,

    server: {
        baseDir: './dist/udemy-angular6',
        middleware: [
            proxy('/api/', {
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true, // needed for virtual hosted sites
                ws: true // proxy websockets
            })
        ]
    },

    // Stop the browser from automatically opening
    open: false,

    // Disable UI completely
    ui: false
};