// config-overrides.js
const webpack = require('webpack');

module.exports = {
    webpack: function (config, env) {
        // Add the resolve.fallback property
        config.resolve.fallback = {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            https: false,
            stream: false,
            crypto: require.resolve('crypto-browserify'),
            util: require.resolve('util/'),
            os: require.resolve('os-browserify/browser'),
            buffer: require.resolve('buffer/'), // Add Buffer polyfill
        };

        // Add plugins for Buffer
        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        );

        return config;
    }
};
